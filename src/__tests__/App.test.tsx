import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom'

describe('App tests', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
  );
  })
  
})
