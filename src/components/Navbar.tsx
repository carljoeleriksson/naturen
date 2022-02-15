import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"

function Navbar() {
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
            <Link to="/cart">
                <FaShoppingCart />
            </Link>
        </div>
    </nav>
  )
}

export default Navbar