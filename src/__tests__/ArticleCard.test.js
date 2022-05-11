import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { MemoryRouter } from 'react-router-dom';

const article = {
    id: 'id',
    webTitle: 'title',
    sectionName: 'section'
}

it('renders the component', function() {
  

  render(<MemoryRouter>
          <ArticleCard article={article} />
        </MemoryRouter>);
});

it('matches the snapshot', function() {
  const { asFragment } = render(<MemoryRouter>
                                  <ArticleCard article={article} />
                                </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
})