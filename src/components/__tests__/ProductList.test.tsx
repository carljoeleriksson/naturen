import { render } from "@testing-library/react"
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from "react-router-dom"
import ProductList from "../ProductList"

describe('Product-list tests', () => {
    it('renders without crashing', () => {
        act(() => {
            render(
                //It only renders without errors if the fetch from localStorage is successful.
                <BrowserRouter>
                    <ProductList/>
                </BrowserRouter>
            )
        })
        
    })
})