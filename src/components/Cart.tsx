import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getCurrentCart } from '../utils/cartHelpFunctions'

function Cart() {

    const [cart, setCart]: Array<any> = useState([])
    const [cartTotal, setCartTotal] = useState<number>(0)

function renderCart() {
    return cart.map((product: any) => (
        /* console.log('cartProduct', product); */
        <li key={product.id}>
            <div className="cart-small-thumb-container">
                <img className="cart-small-thumb" src={product.image} alt={product.name} />
            </div>
            <span className="cart-small-title">{product.name}</span>
            <span className="cart-small-price">{product.price}:-</span>
        </li>
    ))
}

    useEffect(() => {
        const currentCartObj: any = getCurrentCart()
        setCart(currentCartObj.cart)
        setCartTotal(currentCartObj.cartTotal)
    }, [])

  return (<>
    
    <div className="cart-small-container">
        <div className="cart-small-header">
            <FaShoppingCart className="cart-small-icon" />
            <span className="badge hidden"></span>
        </div>
        <ul className="cart-small-products">
            {cart.length > 0 ? renderCart() : <span>Din varukorg är tom!</span>}
        </ul>
        <div className="cart-small-footer">
            <div className="cart-small-total">
                <span>Totalt: <b>{cart.length > 0 ? cartTotal : 0}</b> SEK</span>
            </div>
            <Link className="btn" to="/cart">Gå till kassan</Link>
        </div>
	</div>
  </>
      
  
  )
}

export default Cart