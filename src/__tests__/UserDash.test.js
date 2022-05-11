import React from "react";
import { MemoryRouter } from "react-router-dom";
import { screen } from '@testing-library/react'
import renderWithContext from '../helpers/testContext';
import UserDash from '../components/UserDash/UserDash';

it('renders the component', function() {
  renderWithContext(<MemoryRouter><UserDash /></MemoryRouter>)
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter><UserDash /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it('displays the user name', function() {
  renderWithContext(<MemoryRouter><UserDash /></MemoryRouter>);
  const greeting = screen.getByText('Hello, test');
  expect(greeting).toBeInTheDocument();
})