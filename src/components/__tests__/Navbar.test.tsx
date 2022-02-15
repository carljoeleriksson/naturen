import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';


describe('Navbar component tests', () => {
    
    it('renders without crashing', () => {

        render(
                <BrowserRouter>
                    <Navbar/>
                </BrowserRouter>
            )
    })

    it('renders 5 links', () => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        )

        const navItems = screen.queryAllByRole('link')
        expect(navItems.length).toBe(5)
    })

    
})