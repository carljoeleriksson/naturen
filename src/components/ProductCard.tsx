import React, { useState } from 'react'

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

    function addToCart() {  
        //Get current cart from localStorage
        const cartFromLS:any = localStorage.getItem('cart')
        let currentCart: any[] = JSON.parse(cartFromLS)
        
        
      if(currentCart){
            //Find out if the item already in cart, and return it
            let itemInCart: any = {}
            itemInCart = alreadyInCart(currentCart)
            
          if(!itemInCart && product.stock > 0){
              let newItem = {...product}
              newItem.qty++
              newItem.stock--
              const newCart:any = [newItem, ...currentCart]
              localStorage.setItem('cart', JSON.stringify(newCart))

          } else if(itemInCart.qty > 0 && itemInCart.stock > 0) {
              let newItem = {...itemInCart}
              newItem.qty++
              newItem.stock--
                
              //remove the object from cart 
              const filteredCart = currentCart.filter(cartItem => {
                  return cartItem.id != product.id;
              })

              const newCart:any = [newItem, ...filteredCart]
              localStorage.setItem('cart', JSON.stringify(newCart))
              
          } else if(itemInCart.stock <= 0) {
            console.log('Out of stock');
            setIsOutOfStock(true)
          }
      } else {
          let newItem = {...product}
          newItem.qty = 1
          newItem.stock--
          localStorage.setItem('cart', JSON.stringify([newItem]))
      }
    }

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