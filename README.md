# A cool Next.js setup

This is a guide on how to configure Next.js with Tailwind CSS, TS, ESLint and Typescript.  
Testing setup with Jest and React testing library.


**Next.js** might be the best way to set up a new React project in 2020 & 2021\. I don't even know if it's worth to appraise it even more, but yeah the Next.js team did a great job!

It just stands out with all the needed features to build bulletproof web applications: hybrid approach with SSR, SSG, ISR, hosting can be done on the **Vercel** platform on a serverless runtime. Static assets are where they belong, hosted in a CDN edge network for fast delivery. 🏃🏃🏃

> So let's configure Next with our favorite tools: Typescript & Tailwind CSS, and we'll use ESLint for lining and Jest to write tests.

## Setup Next.js with TS

Go to a terminal and run (replace _next-ts-tailwind_ with your desired app name):

`npx create-next-app next-ts-tailwind`

`cd next-ts-tailwind`

- Create a `tsconfig.json` file:

`touch tsconfig.json`

    {
        "compilerOptions": {
          "allowJs": true,
          "alwaysStrict": true,
          "esModuleInterop": true,
          "forceConsistentCasingInFileNames": true,
          "isolatedModules": true,
          "jsx": "preserve",
          "lib": ["dom", "ES2020"],
          "module": "esnext",
          "moduleResolution": "node",
          "noEmit": true,
          "noFallthroughCasesInSwitch": true,
          "noUnusedLocals": true,
          "noUnusedParameters": true,
          "resolveJsonModule": true,
          "skipLibCheck": true,
          "strict": true,
          "target": "esnext"
        },
        "exclude": ["node_modules"],
        "include": ["**/*.ts", "**/*.tsx"]
      }

*   Add TS dependencies

`yarn add --dev typescript @types/react @types/node`

*   Go to /pages/index.js and change it to index.tsx

*   Run `yarn dev`

*   all good and running on `http://localhost:3000/`

## Setting up Tailwind CSS

The Tailwind team already put together an [excellent tutorial](https://tailwindcss.com/docs/guides/nextjs) to set this up with Next.js, but there are just a few changes needed for it to work with TS files.

`yarn add tailwindcss postcss autoprefixer`

`yarn add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`

`npx tailwindcss init -p`

*   Go to `tailwind.config.js` and change `purge: [],` with:

`purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],`

This makes sure that when we build for production **only** the classes that we use from the tailwind framework will remain in the final production css file. It's called _tree shaking_ if you need a more fancy term to impress your grandma. 👵

*   Include tailwind at the top of your ./styles/global.css file

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

*   Go to your `pages/_app.js` (that you should rename to _app.tsx) component and make sure it looks like this:

    import "../styles/globals.css";
    import type { AppProps } from "next/app";

    function MyApp({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />;
    }

    export default MyApp;

*   To test tailwind is working go to `index.tsx` and change it to:

    import Head from "next/head";
    import styles from "../styles/Home.module.css";

    export default function Home() {
      return (
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Be Warned</p>
            <p>You are using Tailwind CSS!</p>
          </div>
        </div>
      );
    }

## Setting up ESLint

`yarn add --dev eslint`

*   Run `npx eslint --init` and answer with the following:

![initialize ESLint](https://dev-to-uploads.s3.amazonaws.com/i/6yt7uoumpylp3e7cl8nk.PNG)

Go to `package.json` and in the scripts section, add:

`"lint": "eslint ."`

Now, if you try `yarn lint` , you will see a bunch of errors. Go to `eslintrc.json` and modify it to:

    {
        "env": {
            "browser": true,
            "es2021": true,
            "node": true,
            "jest": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:@typescript-eslint/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "settings": {
            "react": {
                "version": "detect"   // Automatically detect the react version
            }
        },
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": 12,
            "sourceType": "module"
        },
        "plugins": [
            "react",
            "@typescript-eslint"
        ],
        "rules": {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off"
        }
    }

Note that I also disabled the `explicit-module-boundary-types` because I like TS to do its job and infer the return types for me, but you can remove that if you like to always add return types to your functions. There will be other lint warnings that you will probably not like and turn off, that's totally fine.

Running `yarn lint` now should result in no warnings and errors.

> Note that you should probably use the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) if you use VSCode. This way you can see errors and fix them as they pop-up while you code.

## Adding Jest

`yarn add --dev babel-jest jest @types/jest @types/babel-generator`

*   in `package.json` scripts section - add `"test": "jest --watch"`

*   create a `.babelrc` file in the root and add in it:

    {
        "presets": ["next/babel"]
    }

*   Create a `jest.config.js` with:

    module.exports = {
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    };

*   And a `jest.setup.ts` with:

    import "@testing-library/jest-dom";

Next, let's add the **React testing** packages:

`yarn add --dev @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event`

Create in the components folder a file `SomeComp.test.tsx` with:

    import { render } from "@testing-library/react";

    function SomeComp() {
      return <div>Hello</div>;
    }

    describe("SomeComp", () => {
      it("renders Hello", () => {
        const { getByText } = render(<SomeComp />);
        expect(getByText("Hello")).toBeInTheDocument();
      });
    });

Run `yarn test` : PASS components/SomeComp.test.tsx SomeComp √ renders Hello (24 ms)

## Conclusions

If you got this far congrats - you have a Next.js app configured with TS, Tailwind CSS, ESLint, and the testing is set up with Jest and RTL. 🥳

If you got stuck or prefer to see the working solution directly you can check it out on [Github](https://github.com/tkssharma/nextjs-modern-apps).
