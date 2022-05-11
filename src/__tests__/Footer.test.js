import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer/Footer';

it('renders the component', function() {
  render(<Footer />);
});

it('matches snapshot', function() {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});