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

function addToCart() {
  
  const cartFromLS:any = localStorage.getItem('cart')
  const currentCart: any[] = JSON.parse(cartFromLS)
  console.log('currentCart before add', currentCart);
  
  if(!currentCart){
    localStorage.setItem('cart', JSON.stringify([product]))
  } else {
    const newCart:any = [product, ...currentCart]
    localStorage.setItem('cart', JSON.stringify(newCart))
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
                <button onClick={addToCart} className="add-to-cart-btn icon-btn"><FaCartPlus /></button>
          </div>
    </div>
  </>
  )
}

export default ProductCard