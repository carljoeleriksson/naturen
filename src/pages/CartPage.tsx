import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { getCurrentCart, setToLocalStorage, deleteFromLocalStorage } from '../utils/cartHelpFunctions'

function CartPage() {

    const [cart, setCart] = useState<any[]>([])
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [dummyPrompt, setDummyPrompt] = useState<boolean>(false)

    
    function plusQty(product: any) {
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        const productsFromLS:any = localStorage.getItem('productList')
        let productList: any[] = JSON.parse(productsFromLS)
        
        if(product.stock > 0){
            let newItem = {...product}
            
            newItem.qty++
            newItem.stock--
            setToLocalStorage(newItem, productList, currentCart)
            const currentCartObj: any = getCurrentCart()
            setCart(currentCartObj.cart)
            setCartTotal(currentCartObj.cartTotal)

        } else if(product.stock <= 0) {
            console.log('Out of stock');
        }     
    }
    
    function minusQty(product: any) {
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        const productsFromLS:any = localStorage.getItem('productList')
        let productList: any[] = JSON.parse(productsFromLS)
        
        if(product.qty > 1){
            console.log('cartpage if');
            
            let newItem = {...product}
            newItem.qty--
            newItem.stock++

            setToLocalStorage(newItem, productList, currentCart)
            const currentCartObj: any = getCurrentCart()
            setCart(currentCartObj.cart)
            setCartTotal(currentCartObj.cartTotal)

        } else if(product.qty === 1) {
            console.log('partpage else if');

            let newItem = {...product}
            
            newItem.stock += newItem.qty
            newItem.qty--

            deleteFromLocalStorage(newItem, productList, currentCart)
            const currentCartObj: any = getCurrentCart()
            setCart(currentCartObj.cart)
            setCartTotal(currentCartObj.cartTotal)
        }
        
    }
    
    function deleteFromCart(product: any) {
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        const productsFromLS:any = localStorage.getItem('productList')
        let productList: any[] = JSON.parse(productsFromLS)

        console.log('deleteFromCart');
            
        let newItem = {...product}

        deleteFromLocalStorage(newItem, productList, currentCart)
        const currentCartObj: any = getCurrentCart()
        setCart(currentCartObj.cart)
        setCartTotal(currentCartObj.cartTotal)
    }
    
    
    function renderCart() {
        return cart.map((product: any) => (
            <li key={product.id}>
                <div className="cart-thumb-container">
                    <img className="cart-thumb" src={product.image} alt={product.name} />
                </div>
                <span className="cart-title">{product.name}</span>
                <span className="cart-desc">{product.shortDesc}</span>
                <span className="cart-price">{product.price}:-</span>
                <span className="cart-qty">Antal: {product.qty}</span>
                <span className="cart-stock">I lager: {product.stock}</span>
                <div className="cart-edt-qty">
                    <button className={`icon-btn`} onClick={() => plusQty(product)}><FaPlusCircle /></button>
                    <button className="icon-btn" onClick={() => minusQty(product)}><FaMinusCircle /></button>
                </div>
                <button className="cart-delete icon-btn" data-testid='deleteproduct' onClick={() => deleteFromCart(product)}><FaTrashAlt /></button>
            </li>
        ))
    }

    useEffect(() => {
        const currentCartObj: any = getCurrentCart()
        setCart(currentCartObj.cart)
        setCartTotal(currentCartObj.cartTotal)
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
            <button onClick={() => {
                            setDummyPrompt(true)
                            setTimeout(() => {
                                setDummyPrompt(false)
                            }, 2000)
            }}>Köp</button>
                {dummyPrompt && 
                    <div className="prompt">
                        <span>Köpet genomfört😉</span>
                    </div>
                }
            <div className="cart-total">
                <span>Totalt: <b>{(cart.length > 0) && cartTotal}</b> SEK</span>
            </div>
        </div>
	</div>
  </>
      
  
  )
}


export default CartPage