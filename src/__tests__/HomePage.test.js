import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithContext from '../helpers/testContext';
import HomePage from '../components/HomePage/HomePage';

it('renders the components', function() {
  renderWithContext(<MemoryRouter><HomePage /></MemoryRouter>)
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it('does not contain login button where there is a saved user', function() {
  renderWithContext(<MemoryRouter><HomePage /></MemoryRouter>);
  const login = screen.queryByText('Login');
  expect(login).not.toBeInTheDocument();
})

it('contains login button when there is no saved user', function() {
  renderWithContext(<MemoryRouter><HomePage /></MemoryRouter>, null);
  const login = screen.queryByText('Login');
  expect(login).toBeInTheDocument();
});