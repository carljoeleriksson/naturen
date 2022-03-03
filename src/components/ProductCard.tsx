import React, { useEffect, useState } from 'react'
import { addToCart } from '../utils/cartHelpFunctions'

import { FaCartPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ProductCard(product:any) {
    const [isOutOfStock, setIsOutOfStock] = useState<Boolean>(false)

    let {id, name, shortDesc, price, image} = product
    const navigate = useNavigate()


    function goToProduct() {
      navigate('/product/' + id)
    }

    function handleClick() {
        const addedToCart = addToCart(product)
        
        //returns false if it's out of stock.
        if(typeof addedToCart !== 'undefined') {
            setIsOutOfStock(true)
        }
    }

    function checkIfOutOfStock() {
        if(product.stock < 1) {
            setIsOutOfStock(true)
        } else {
            setIsOutOfStock(false)
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
                <button onClick={handleClick} className={`add-to-cart-btn icon-btn ${isOutOfStock ? 'disabled': ''}`}><FaCartPlus /></button>
          </div>
    </div>
  </>
  )
}

export default ProductCard