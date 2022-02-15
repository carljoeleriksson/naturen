import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import AboutPage from '../AboutPage'

describe('AboutPage tests', () => {
  
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        )
    })
    
    it('renders a logo image', () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        )  
        const logoElem = screen.getByAltText(/logo/i)
        expect(logoElem).toBeInTheDocument();
    })
    it('renders a text segment', () => {
        render(
            <BrowserRouter>
                <AboutPage />
            </BrowserRouter>
        )
        const textElem = screen.queryAllByText(/naturen/i)
        expect(textElem.length).not.toBe(0)
    })

})
