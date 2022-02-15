import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ProductItemPage from "../ProductItemPage"
describe('Product-item page tests', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <ProductItemPage />    
            </BrowserRouter>)
    })
})