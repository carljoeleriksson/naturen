import { act, render, screen, waitFor } from "@testing-library/react"
import { mockSessionStorage } from '../../__mocks__/sessionStorage';
import { BrowserRouter } from "react-router-dom"
import UserPage from "../UserPage"

const { getItemMock, setItemMock } = mockSessionStorage();

const mockUserArr = [
    {
        id: 1,
        username: "user",
        password: "user",
        role: "user",
        firstName: "Mock",
        lastName: "Mocksson",
        email: "steve.larsson@mail.com"
    },
    {
        id: 2,
        username: "admin",
        password: "admin",
        role: "admin",
        firstName: "Gloria",
        lastName: "Olsson",
        email: "gloria.olsson@mail.com"
    }
]

describe('UserPage tests', () => {
    getItemMock.mockReturnValueOnce('admin')
    beforeEach(() => {
        act(() => {
            render(
                <BrowserRouter>
                    <UserPage/>
                </BrowserRouter>    
            )
        })
            
    })
    it('renders without crashing', () => {})
    it('renders a username element', async () => {
        const userElem = await screen.findByTestId(/username/i)
        expect(userElem).toBeInTheDocument()
    })
    it('renders a firstName element', async () => {
        const nameElem = await screen.findByTestId(/firstname/i)
        expect(nameElem).toBeInTheDocument()
    })
    it('renders a lastName element', async () => {
        const nameElem = await screen.findByTestId(/lastname/i)
        expect(nameElem).toBeInTheDocument()
    })
    it('renders an email element', async () => {
        const mailElem = await screen.findByTestId(/mail/i)
        expect(mailElem).toBeInTheDocument()
    })
    it('renders a role element', async () => {
        const roleElem = await screen.findByTestId(/role/i)
        expect(roleElem).toBeInTheDocument()
    })

    it('does not render admin section if role is user', () => {
        const adminSect = screen.queryByTestId(/admin-section/i)
        expect(adminSect).not.toBeInTheDocument()
    })
})