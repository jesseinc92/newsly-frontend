import React from 'react';
import { render } from '@testing-library/react';
import SearchPage from '../components/SearchPage/SearchPage';

it('renders the component', function() {
  render(<SearchPage />);
});

it('matches the snapshot', function() {
  const { asFragment } = render(<SearchPage />);
  expect(asFragment()).toMatchSnapshot();
});