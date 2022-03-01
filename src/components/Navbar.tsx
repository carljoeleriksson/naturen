import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"
import Cart from './Cart'

function Navbar() {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    
    function toggleCart() {
        if(!cartOpen){
            setCartOpen(true)
            
        } else {
            setCartOpen(false)
        }
    }

  return (
    <nav>
        <div className="nav-section">
            <Link className="logo-link" to="/">
                Naturen&reg;
            </Link>
            <Link to="/">Produkter</Link>
            <Link to="/about">Om Naturen&reg;</Link>
        </div>
        <div className="nav-section">
            <Link to="/my-account">
                <FaUserCircle />
            </Link>
            <button className="toggle-cart-btn" onClick={toggleCart}><FaShoppingCart /></button>
        </div>
        {cartOpen && <Cart />}
    </nav>
  )
}

export default Navbar