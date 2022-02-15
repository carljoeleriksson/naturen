import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Cart() {

    const [cart, setCart]: Array<any> = useState([])
    const [cartTotal, setCartTotal] = useState<number>(0)

    function getCurrentCart() {
        let cartFromLS:any = localStorage.getItem('cart')

        if(cartFromLS.length > 0){
            setCart(cartFromLS)
            const cartSum: any = getCartTotal(cartFromLS)
            setCartTotal(cartSum)

        } else {
            setCart([])
        }

    }

    function getCartTotal(cart: Array<any>) {
        let cartTotal: number = 0;
        let price: any = 0;

        cart.map((item: any) => {
                price = item.price;
                
                for(var i = 0; i < price.length; i++){
                      cartTotal += parseFloat(price[i]);
                 }
             });
             
/*         cart.filter((item: any) => {
            item.id
        }) */
    }

    useEffect(() => {
        getCurrentCart()
    }, [])

  return (<>
    
    <div className="cart">
        <div className="cart-header">
            <FaShoppingCart className="cart-icon-small" />
            <span className="badge hidden"></span>
            <div className="cart-total">
                <span>Total: <b>{cartTotal}</b>SEK</span>
            </div>
        </div>
        {/* {cart.length > 0 && renderCart} */}
        <Link className="btn" to="/cart">Go to cart</Link>
	</div>
  </>
      
  
  )
}

export default Cart