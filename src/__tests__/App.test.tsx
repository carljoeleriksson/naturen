import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { BrowserRouter } from 'react-router-dom'

describe('App tests', () => {
  it('renders without crashing', () => {
        act(() => {
            render(
                    <App />
            );
        })
    
  })
  
})
