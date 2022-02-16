import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CartPage() {

    const [cart, setCart]: Array<any> = useState([])
    const [cartTotal, setCartTotal] = useState<number>(0)

    function getCurrentCart() {
        const cartFromLS:any = localStorage.getItem('cart')

        if(cartFromLS){
            setCart(JSON.parse(cartFromLS))
         /*    const cartSum: any = getCartTotal(cartFromLS)
            setCartTotal(cartSum) */
        } else {
            setCart([])
        }

    }

function renderCart() {
    return cart.map((product: any) => (
        /* console.log('cartProduct', product); */
        <li key={product.id}>
            <div className="cart-thumb-container">
                <img className="cart-thumb" src={product.image} alt={product.name} />
            </div>
            <span className="cart-title">{product.name}</span>
            <span className="cart-desc">{product.shortDesc}</span>
            <span className="cart-price">{product.price}:-</span>
            <span className="cart-qty">Antal: </span>
            <span className="cart-stock">I lager: {product.quantity}</span>
            <div className="cart-edt-qty">
                <button className="icon-btn"><FaPlusCircle /></button>
                <button className="icon-btn"><FaMinusCircle /></button>
            </div>
            <button className="cart-delete icon-btn"><FaTrashAlt /></button>
        </li>
    ))
}

 /*    function getCartTotal(cart: Array<any>) {
        let cartTotal: number = 0;
        let price: any = 0;

        cart.map((item: any) => {
                price = item.price;
                
                for(var i = 0; i < price.length; i++){
                      cartTotal += parseFloat(price[i]);
                 }
             });
    } */

    useEffect(() => {
        getCurrentCart()
    }, [])

  return (<>
    
    <div className="cart-container">
        <div className="cart-header">
            <h2>Din varukorg</h2>
            <FaShoppingCart className="cart-icon" />
            <span className="badge hidden"></span>
        </div>
        <ul className="cart-products">
            {cart.length > 0 ? renderCart() : <span>Din varukorg är tom!</span>}
        </ul>
        <div className="cart-footer">
            <div className="cart-total">
                <span>Totalt: <b>{cartTotal}</b> SEK</span>
            </div>
        </div>
	</div>
  </>
      
  
  )
}


export default CartPage