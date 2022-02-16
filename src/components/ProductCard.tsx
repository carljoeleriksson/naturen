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
        /* 
        let isInCart = false;
        for(var i = 0; i < currentCart.length; i++) {
            if (currentCart[i].name == product.name) {
                isInCart = true;
                break;
            }
        }
        
        return isInCart
 */     console.log('currentCart in alreadyInCart:', currentCart);
 
        let itemInCart = currentCart.filter((cartItem: any) => (cartItem.name)
                .toLowerCase()
                .includes(product.name.toLowerCase())
        );
        console.log("itemInCart: ", itemInCart);
        
        return itemInCart
    }

    function addToCart() {  
      const cartFromLS:any = localStorage.getItem('cart')
      let currentCart: any[] = JSON.parse(cartFromLS)

      if(currentCart){
          const itemInCart: any = alreadyInCart(currentCart)
          if(itemInCart.qty <= 0){
              console.log('item not in cart');
              let newItem = {...product}
              newItem.qty++
              newItem.stock--
              const newCart:any = [newItem, ...currentCart]
              localStorage.setItem('cart', JSON.stringify(newCart))
          } else if(itemInCart.stock <= 0) {
              console.log('Out of stock');
              setIsOutOfStock(true)
          } else {
              console.log('item In Cart');
              let newItem = {...itemInCart[0]}
              newItem.qty++
              newItem.stock--

              //remove the object from cart 
              const filteredCart = currentCart.filter(cartItem => {
                  console.log(cartItem.id);
                  return cartItem.id != product.id;
              })

              console.log('filteredCart:', filteredCart);
              const newCart:any = [newItem, ...filteredCart]
              localStorage.setItem('cart', JSON.stringify(newCart))
          }

      } else {
          console.log('First product in cart');
          
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