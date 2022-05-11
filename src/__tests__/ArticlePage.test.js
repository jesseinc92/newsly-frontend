import React from 'react';
import { screen } from '@testing-library/react';
import renderWithContext from '../helpers/testContext';
import ArticlePage from '../components/ArticlePage/ArticlePage';
import { MemoryRouter } from 'react-router-dom';

it('renders the component', function() {
  renderWithContext(<MemoryRouter><ArticlePage /></MemoryRouter>);
});

it('matches the snapshot', function() {
  const { asFragment } = renderWithContext(<MemoryRouter><ArticlePage /></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});

it('displays loading without article data', function() {
  renderWithContext(<MemoryRouter><ArticlePage /></MemoryRouter>);
  const loading = screen.getByText('Loading...');
  expect(loading).toBeInTheDocument();
})