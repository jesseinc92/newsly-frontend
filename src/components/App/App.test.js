import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

it('renders app component', () => {
  render(<MemoryRouter>
          <App />
        </MemoryRouter>);
});
