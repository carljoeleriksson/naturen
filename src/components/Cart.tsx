import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Cart() {

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
            <div className="cart-small-thumb-container">
                <img className="cart-small-thumb" src={product.image} alt={product.name} />
            </div>
            <span className="cart-small-title">{product.name}</span>
            <span className="cart-small-price">{product.price}:-</span>
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
                <span>Totalt: <b>{cartTotal}</b> SEK</span>
            </div>
            <Link className="btn" to="/cart">Gå till kassan</Link>
        </div>
	</div>
  </>
      
  
  )
}

export default Cart