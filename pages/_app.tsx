import 'tailwindcss/tailwind.css'
import '../styles/home.css';
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ ...props }: AppProps) {
  // handles specific layouts for various routes

  if (props.router.route === "/") {
    return <HomepageLayout {...props} />;
  } else if (props.router.route.startsWith("/")) {
    return <PageLayout {...props} />;
  }

  return <GenericLayout {...props} />;
}

function HomepageLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fumami Kitchen Rentals</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        {/* when you need SEO, remove this */}
        <meta name="robots" content="noindex, nofollow" />

        <meta
          name="description"
          content="Kitchen space shouldn't be so hard to find. Join our network to find, rent or share your unused kitchen space."
        />
        <meta
          name="keywords"
          content="fumami, rentals, kitchen rentals, kitchens for rent, commercial kitchen, commercial kitchen rental, temporary kitchen, temporary kitchen rental, borrow kitchen"
        />

        <meta
          property="og:description"
          content="Kitchen space shouldn't be so hard to find. Join our network to find, rent or share your unused kitchen space."
        />
        <meta
          property="og:title"
          content="Host or Rent kitchen space - Fumami Kitchen Rentals"
        />
        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://v.fastcdn.co/u/04630d01/56717827-0-Fumami-logo.JPG"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:site_name" content="Fumami Kitchen Rentals" />

        <meta property="og:url" content="https://app.fumami.rentals/" />

        <meta property="og:locale" content="en_US" />

        <link rel="shortcut icon" href="//v.fastcdn.co/u/04630d01/56723247-0-FumamiFavicon.png" type="image/ico" />

      </Head>
      <Component {...pageProps} />
    </>
  );
}

function PageLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fumami</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* when you need SEO, remove this */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

function GenericLayout({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
