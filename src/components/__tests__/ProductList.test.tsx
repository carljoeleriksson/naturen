import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ProductList from "../ProductList"

describe('Product-list tests', () => {
    it('renders without crashing',() => {
        render(
            <BrowserRouter>
                <ProductList/>
            </BrowserRouter>
            
        )
    })
})