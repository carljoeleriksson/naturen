import React from 'react'
import {Link} from 'react-router-dom'
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"

function Navbar() {
  return (
	<nav>
        <Link className="logo-link" to="/">
            NATUREN
        </Link>
        <Link to="/products">Produkter</Link>
        <Link to="/about">Om</Link>

        <div className="nav-right">
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