import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import CartPage from "../CartPage"
import { mockLocalStorage } from '../../__mocks__/localStorage';
import userEvent from '@testing-library/user-event'


const { getItemMock, setItemMock } = mockLocalStorage();

const mockProduct = {
            id: 1,
            name: "MockITestFil",
            description: "En såpbubbla som varar för evigt (så länge den förvaras i -50 och inte vidrörs",
            shortDesc: "Frusen såpbubbla",
            price: 199,
            image: "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1961&q=80",
            stock: 10,
            qty: 0
        }
const mockCartArr = [
    {
        "id": 1,
        "name": "MockIsbubbla",
        "description": "En såpbubbla som varar för evigt (så länge den förvaras i -50 och inte vidrörs",
        "shortDesc": "Frusen såpbubbla",
        "price": 199,
        "image": "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1961&q=80",
        "stock": 10,
        "qty": 1
    },
    {
        "id": 2,
        "name": "MockMossa",
        "description": "En näve grön björnmossa från en klipphäll i Dalsland.",
        "shortDesc": "En näve mossa",
        "price": 349,
        "image": "https://images.unsplash.com/photo-1591931559191-3ba5ecc12410?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80",
        "stock": 10,
        "qty": 3
    },
    {
        "id": 3,
        "name": "MockStensMannen",
        "description": "Rejäl sten som varit med ett tag, men fortfarande i gott skick.",
        "shortDesc": "Massiv diabas",
        "price": 499,
        "image": "https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
        "stock": 10,
        "qty": 5
    }
]

describe('Cart-page tests', () => {
    beforeEach(() => {
        getItemMock.mockReturnValue(JSON.stringify(mockCartArr))
            render(
                <BrowserRouter>
                    <CartPage/>
                </BrowserRouter>
            )
    })
    it('renders without crashing', () => {})

    it('renders a list of the items in cart', () => {
        waitFor(() => {
            const listItems = screen.queryAllByRole('listitem')
            expect(listItems[0]).toBeInTheDocument()
        })
    })
    it('should be one item less on the page after i click delete product', () => {
        waitFor(() => {
            const listItemsPreClick = screen.queryAllByRole('listitem')
            const numOfItemsPreClick = listItemsPreClick.length

            const deleteBtn = screen.getByTestId('deleteproduct')
            userEvent.click(deleteBtn)

            const listItemsPostClick = screen.queryAllByRole('listitem')
            const numOfItemsPostClick = listItemsPostClick.length
            expect(numOfItemsPostClick).toBe(numOfItemsPreClick - 1)
        })  
    })
})