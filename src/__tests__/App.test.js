import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../components/App/App';

it('renders app component', function() {
  render(<MemoryRouter>
          <App />
        </MemoryRouter>);
});
