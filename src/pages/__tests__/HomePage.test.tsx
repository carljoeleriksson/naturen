import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage'
import { BrowserRouter } from 'react-router-dom';

describe('HomePage tests', () => {
    
    it('renders without crashes', () => {
        waitFor(() => {
            render(
                    <BrowserRouter>
                        <HomePage/>
                    </BrowserRouter>
                )
        })
    })
    
})