import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FrontPage from '../components/FrontPage/FrontPage';

it('renders the component', function() {
  render(<MemoryRouter><FrontPage /></MemoryRouter>)
});

it('matches the snapshot', function() {
  const { asFragment } = render(<MemoryRouter><FrontPage /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})

it('contains the front page header', function() {
  render(<MemoryRouter><FrontPage /></MemoryRouter>);
  const header = screen.getByText('Front Page');
  expect(header).toBeInTheDocument();
})