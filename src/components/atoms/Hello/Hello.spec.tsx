import React from 'react';
import { render } from '@testing-library/react'

import Hello from './Hello';

describe('Hello', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Hello children=""/>);
    expect(asFragment()).toMatchSnapshot();
  });
});