import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SortBar from "../SortBar"

describe('Sorting-bar tests', () => {
    it('renders without crashing', () => {
        render(
        <BrowserRouter>
            <SortBar />
        </BrowserRouter>)
    })
})