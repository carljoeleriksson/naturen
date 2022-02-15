import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

describe('Product-card tests', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <ProductCard />    
            </BrowserRouter>
        )
    })

    it('renders without crashing', () => {})
    it('renders a product title', () => {
        const hElem = screen.getByRole('heading')
        expect(hElem).toBeInTheDocument()
    })
    it('renders a short description', () => {
        const shortDesc = screen.getByTestId('short-desc')
        expect(shortDesc).toBeInTheDocument()
    })
    it('renders a product price', () => {
        const priceElem = screen.getByTestId('price')
        expect(priceElem).toBeInTheDocument()
    })

    it('renders an add-to-cart button', () => {
        const addBtn = screen.getByRole('button')
        expect(addBtn).toBeInTheDocument()
    })
    //add-to-cart button turns grey if the product is inavailable
})