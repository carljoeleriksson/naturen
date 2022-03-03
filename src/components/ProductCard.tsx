import React, { useEffect, useState } from 'react'
import { addToCart, checkIfLoggedIn } from '../utils/cartHelpFunctions'
import { Link } from 'react-router-dom'

import { FaCartPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ProductCard(product:any) {
    const [isOutOfStock, setIsOutOfStock] = useState<Boolean>(false)
    const [showLoginPrompt, setShowLoginPrompt] = useState<Boolean>(false)

    let {id, name, shortDesc, price, image} = product
    const navigate = useNavigate()


    function goToProduct() {
      navigate('/product/' + id)
    }

    function handleClick() {
        const isLoggedIn = checkIfLoggedIn()
        if(isLoggedIn.isLoggedIn){
            const addedToCart = addToCart(product)
            //returns false if it's out of stock.
            if(typeof addedToCart !== 'undefined') {
                setIsOutOfStock(true)
            }    
        } else {
            setShowLoginPrompt(true)
            setTimeout(() => {
                setShowLoginPrompt(false)
            }, 3000)
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
                {showLoginPrompt && 
                    <div className="login-prompt">
                        <span><Link to="/login">Logga in</Link> för att handla!</span>
                    </div>
                }
          </div>
    </div>
  </>
  )
}

export default ProductCard