import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithContext from '../helpers/testContext';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

it('renders the component', function() {
  renderWithContext(<MemoryRouter><RegistrationForm /></MemoryRouter>, null)
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter><RegistrationForm /></MemoryRouter>, null);
  expect(asFragment()).toMatchSnapshot();
})