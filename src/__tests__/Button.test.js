import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Button from '../components/Button/Button';

it('renders the component', function() {
  render(<MemoryRouter>
          <Button />
        </MemoryRouter>)
});

it('matches the snapshot', function() {
  const { asFragment } = render(<MemoryRouter>
                                  <Button />
                                </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})

it('matches snapshot with button text', function() {
  // find syntax fix for "matcher" error
  render(<MemoryRouter><Button text='Save' /></MemoryRouter>);
  const button = screen.getByText('Save');
  expect(button).toBeInTheDocument();
})