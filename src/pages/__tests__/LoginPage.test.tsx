import { render, screen} from "@testing-library/react"
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from "react-router-dom"
import userEvent from '@testing-library/user-event'
import LoginPage from "../LoginPage"

/* 
import { validateLogin } from "../../utils/loginHelper";

const mockReturn = {
    success: false,
    loginErr: "Inloggning misslyckades",
    userErr: "Fyll i användarnamn",
    passErr: "Fyll i lösenord"
}

jest.mock('../../utils/loginHelper', () => ({
    ...jest.requireActual('../../utils/loginHelper'),
    validateLogin: jest.fn(() => mockReturn)
}))

const mockValidateLogin = jest.mocked(validateLogin)
 */


describe('LoginPage tests', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )
    })
    it('renders without crashing', () => {})


    it('renders a username input', () => {
        const userElem = screen.getByPlaceholderText(/användarnamn/i)
        expect(userElem).toBeInTheDocument()
    })
    
    it('renders a password input', () => {
        const passElem = screen.getByPlaceholderText(/lösenord/i)
        expect(passElem).toBeInTheDocument()
    })
    
    it('renders a login button', () => {
        const loginBtn = screen.getByRole('button', {name: /Logga in/i})
        expect(loginBtn).toBeInTheDocument()
    })

    it('should be the same value in the input field as the username typed in by user', () => {
        const userElem = screen.getByPlaceholderText(/användarnamn/i)
        userEvent.type(userElem, 'user')
        expect(userElem).toHaveValue('user')
    })
    it('should be the same value in the input field as the password typed in by user', () => {
        const userElem = screen.getByPlaceholderText(/lösenord/i)
        userEvent.type(userElem, 'user')
        expect(userElem).toHaveValue('user')
    })
    
})