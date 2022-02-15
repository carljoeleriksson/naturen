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

  return (<>
    <div className="product-card">
          <div className="card-img">
                <img src={image} onClick={goToProduct} alt={name} />
          </div>
          <div className="card-info">
                <h4 onClick={goToProduct}>{name}</h4>
                <span className="short-desc" onClick={goToProduct} data-testid="short-desc">{shortDesc}</span>
                <span className="price" onClick={goToProduct} data-testid="price">{price}:-</span>
                <button className="add-to-cart-btn icon-btn"><FaCartPlus /></button>
          </div>
    </div>
  </>
  )
}

export default ProductCard