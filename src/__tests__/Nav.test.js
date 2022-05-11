import React from 'react';
import { screen } from '@testing-library/react';
import renderWithContext from '../helpers/testContext';
import Nav from '../components/Nav/Nav';
import { MemoryRouter } from 'react-router-dom';

it('renders the component', function() {
  renderWithContext(<MemoryRouter>
                      <Nav />
                    </MemoryRouter>);
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter>
                                            <Nav />
                                          </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it('displays the first name if logged in', function() {
  renderWithContext(<MemoryRouter><Nav /></MemoryRouter>);
  const link = screen.getByText('Hello, test');
  expect(link).toBeInTheDocument();
});

it('displays the login button if not logged in', function() {
  renderWithContext(<MemoryRouter><Nav /></MemoryRouter>, null);
  const link = screen.getByText('Login');
  expect(link).toBeInTheDocument();
});