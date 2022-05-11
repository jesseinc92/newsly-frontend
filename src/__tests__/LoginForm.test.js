import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import renderWithContext from '../helpers/testContext';

it('renders the component', function() {
  renderWithContext(<MemoryRouter><LoginForm /></MemoryRouter>, null);
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter><LoginForm /></MemoryRouter>, null)
  expect(asFragment()).toMatchSnapshot();
})

