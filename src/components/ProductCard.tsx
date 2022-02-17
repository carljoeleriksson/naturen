import React, { useEffect, useState } from 'react'

import { FaCartPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ProductCard(product:any) {
    const [isOutOfStock, setIsOutOfStock] = useState<Boolean>(false)

    let {id, name, shortDesc, price, image} = product
    const navigate = useNavigate()


    function goToProduct() {
      navigate('/product/' + id)
    }

    function alreadyInCart(currentCart: any[]) {
        //Check if product already in cart
        let itemInCart = currentCart.filter((cartItem: any) => (cartItem.name)
                .toLowerCase()
                .includes(product.name.toLowerCase())
        )
        return (itemInCart[0])
    }


    function setToLocalStorage(newItem: any, prodArr:any, cartArr?:any) {
        let newCartItem: any = {...newItem}

        //Check if there is a cart-Array in params
        if(typeof cartArr !== 'undefined'){
            //remove the object from cart 
            const filteredCart = cartArr.filter((item:any) => {
                return item.id != product.id;
            })
            newCartItem.qty++
            const newCart:any = [newCartItem, ...filteredCart]
            localStorage.setItem('cart', JSON.stringify(newCart))

        } else {
            //if no cart-array, just set the item as the new cart.
            newCartItem.qty++
            const newCart:any = [newCartItem]
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
        
                    
        //remove the object from productLlist
        const filteredProducts = prodArr.filter((item:any) => {
            return item.id != product.id;
        })
        newItem.qty = 0
        const newProductList:any = [newItem, ...filteredProducts]
        localStorage.setItem('productList', JSON.stringify(newProductList))
    }


    function addToCart() {  
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        const productsFromLS:any = localStorage.getItem('productList')
        let productList: any[] = JSON.parse(productsFromLS)
        
        
        if(currentCart){
            //Find out if the item already in cart, and return it
            let itemInCart: any = {}
            itemInCart = alreadyInCart(currentCart)
                
            if(!itemInCart && product.stock > 0){
                let newItem = {...product}
                newItem.stock--

                setToLocalStorage(newItem, productList, currentCart)

            } else if(itemInCart.qty > 0 && itemInCart.stock > 0) {
                let newItem = {...itemInCart}
                newItem.stock--
                
                setToLocalStorage(newItem, productList, currentCart)

            } else if(itemInCart.stock <= 0) {
                console.log('Out of stock');
                setIsOutOfStock(true)
            }

            
        } else {
            let newItem = {...product}
            newItem.stock--
            
            setToLocalStorage(newItem, productList)
        }
    }

    function checkIfOutOfStock() {
        if(product.stock <= 0) {
            setIsOutOfStock(true)
        }
    }

    useEffect(() => {
        checkIfOutOfStock()
    }, [])

  return (<>
    <div className="product-card">
          <div className="card-img">
                <img src={image} onClick={goToProduct} alt={name} />
          </div>
          <div className="card-info">
                <h4 onClick={goToProduct}>{name}</h4>
                <span className="short-desc" onClick={goToProduct} data-testid="short-desc">{shortDesc}</span>
                <span className="price" onClick={goToProduct} data-testid="price">{price}:-</span>
                <button onClick={addToCart} className={`add-to-cart-btn icon-btn ${isOutOfStock ? 'disabled' : null}`}><FaCartPlus /></button>
          </div>
    </div>
  </>
  )
}

export default ProductCard