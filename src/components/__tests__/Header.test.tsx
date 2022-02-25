import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header component tests', () => {
    
    it('renders without crashing', () => {
        render(
                <BrowserRouter>
                    <Header/>
                </BrowserRouter>
            )
    })
})