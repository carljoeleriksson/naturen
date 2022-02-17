import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaTrashAlt, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CartPage() {

    const [cart, setCart]: Array<any> = useState([])
    const [cartTotal, setCartTotal] = useState<number>(0)
    const [isOutOfStock, setIsOutOfStock] = useState<Boolean>(false)

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

    function setToLocalStorage(newItem: any, prodArr:any, cartArr?:any) {
        let newCartItem: any = {...newItem}

        //Check if there is a cart-Array in params
        if(typeof cartArr !== 'undefined'){
            console.log('setToLocalStorage if 1:');
            //remove the object from cart 
            const filteredCart = cartArr.filter((item:any) => {
                return item.id != newItem.id;
            })
            newCartItem.qty++
            const newCart:any = [newCartItem, ...filteredCart]
            localStorage.setItem('cart', JSON.stringify(newCart))

        } else {
            console.log('setToLocalStorage if 2:');
            //if no cart-array, just set the item as the new cart.
            newCartItem.qty++
            const newCart:any = [newCartItem]
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
        
                    
        //remove the object from productLlist
        const filteredProducts = prodArr.filter((item:any) => {
            return item.id != newItem.id;
        })
        newItem.qty = 0
        const newProductList:any = [newItem, ...filteredProducts]
        localStorage.setItem('productList', JSON.stringify(newProductList))
    }

    function addQty(product: any) {
        console.log('Add quantity');
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        const productsFromLS:any = localStorage.getItem('productList')
        let productList: any[] = JSON.parse(productsFromLS)

        if(product.stock > 0){
            console.log('addQty if 1:');
            
            let newItem = {...product}
            newItem.stock--

            setToLocalStorage(newItem, productList, currentCart)
        } else if(product.qty > 0 && product.stock > 0) {
            console.log('addQty if 2:');
            let newItem = {...product}
            newItem.stock--
            
            setToLocalStorage(newItem, productList, currentCart)

        } else if(product.stock <= 0) {
            console.log('addQty if 3:');
            console.log('Out of stock');
            setIsOutOfStock(true)
        }
        
    }
    function subQty(product: any) {
        console.log('Subtract quantity');
        
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
                <span className="cart-qty">Antal: {product.qty}</span>
                <span className="cart-stock">I lager: {product.stock}</span>
                <div className="cart-edt-qty">
                    <button className={`icon-btn ${isOutOfStock ? 'disabled' : null}`} onClick={() => addQty(product)}><FaPlusCircle /></button>
                    <button className="icon-btn" onClick={() => subQty(product)}><FaMinusCircle /></button>
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