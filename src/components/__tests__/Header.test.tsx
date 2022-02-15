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
    it('renders an image', () => {
        render(
            <BrowserRouter>
                <Header/>
            </BrowserRouter>
        )

        const imageElem = screen.getByRole('img')
        expect(imageElem).toBeInTheDocument()
    })
    
})