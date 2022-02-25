import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import userEvent from '@testing-library/user-event';


describe('Navbar component tests', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Navbar/>
            </BrowserRouter>
        )
    })
    it('renders without crashing', () => {})
    
    it('renders two sections inside the nav element', () => {
        const navElem = screen.getByRole('navigation')
        expect(navElem.childElementCount).toBe(2)
    })

    it('renders 4 links', () => {

        const navLinks = screen.queryAllByRole('link')
        expect(navLinks.length).toBe(4)

    })
    it('renders 1 cart button', () => {

        const navCartBtn = screen.queryByRole('button')
        expect(navCartBtn).toBeInTheDocument();
    })
})