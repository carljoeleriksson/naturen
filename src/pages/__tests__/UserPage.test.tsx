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
        waitFor(() => {
            render(
                <BrowserRouter>
                    <UserPage/>
                </BrowserRouter>    
            )

        })
            
    })
    it('renders without crashing', () => {})
    it('renders a username element', () => {
        waitFor(() => {
            const userElem = screen.getByTestId(/username/i)
            expect(userElem).toBeInTheDocument()

        })
    })
    it('renders a firstName element', () => {
        waitFor(() => {
            const nameElem = screen.getByTestId(/firstname/i)
            expect(nameElem).toBeInTheDocument()

        })
    })
    it('renders a lastName element', () => {
        waitFor(() => {
            const nameElem = screen.getByTestId(/lastname/i)
            expect(nameElem).toBeInTheDocument()

        })
    })
    it('renders an email element', () => {
        waitFor(() => {
            const mailElem = screen.getByTestId(/mail/i)
            expect(mailElem).toBeInTheDocument()
        })
    })
    it('renders a role element', () => {
        waitFor(() => {
            const roleElem = screen.getByTestId(/role/i)
            expect(roleElem).toBeInTheDocument()

        })
    })

    it('does not render admin section if role is user', () => {
        const adminSect = screen.queryByTestId(/admin-section/i)
        expect(adminSect).not.toBeInTheDocument()
    })
})