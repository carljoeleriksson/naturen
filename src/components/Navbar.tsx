import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"
import Cart from './Cart'
import { checkIfLoggedIn } from '../utils/cartHelpFunctions'
import IsLoggedIn from './IsLoggedIn'

function Navbar() {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    function toggleCart() {
        if(!cartOpen){
            setCartOpen(true)
        } else {
            setCartOpen(false)
        }
    }

    useEffect(() => {
        const loggedIn = checkIfLoggedIn()
        setIsLoggedIn(loggedIn.isLoggedIn)
    })
    
  return (<>
    <IsLoggedIn/>
    <nav>
        <div className="nav-section">
            <Link className="logo-link" to="/">
                Naturen&reg;
            </Link>
            <Link to="/">Produkter</Link>
            <Link to="/about">Om Naturen&reg;</Link>
        </div>
        <div className="nav-section">
            {isLoggedIn ? <Link to="/my-account"><FaUserCircle /></Link> : <Link to="/login"><FaUserCircle /></Link>}
            <button className="toggle-cart-btn" onClick={toggleCart}><FaShoppingCart /></button>
        </div>
        <Cart show={cartOpen} onClickOutside={() => setCartOpen(false)}/>
    </nav>
  </>
  )
}

export default Navbar