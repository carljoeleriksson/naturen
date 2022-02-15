import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductItemPage() {
    const { id } = useParams()
    const Id = Number(id)

    const [allProducts, setAllProducts]: Array<any> = useState([])
    const [product, setProduct]: Array<any> = useState([])

    function getProductsFromLS() {
        const productListStr: string | null = localStorage.getItem('productList')

        if (!productListStr) {
            throw new Error("Can't find productList in Local Storage")
        }

        const productList: Array<any> = JSON.parse(productListStr)
        setAllProducts(productList)
        
        const singleProduct: Array<any> = getSingleProduct(productList)
        setProduct(singleProduct[0])        
    }

    function getSingleProduct(productList: Array<any>) {
        if(productList) {
            let singleProduct: any = null
        
            singleProduct = productList.filter((prod: any) => {
                    return prod.id === Id
                }
            )
            return singleProduct
        } else {
            console.log('No products in allProducts yet');
            
        }
        
    }


    useEffect(() => {
        try {
            getProductsFromLS()
        } catch (error) {
            console.log(error);
        }
    }, [])
  return (<>
        <div className="product-item-container">
            <img className="product-img" src={product.image} alt={product.name} />
            <div className="product-info">
                <h4 className="product-title">{product.name}</h4>
                <span className="product-desc">{product.description}</span>
                <span className="product-price">{product.price} SEK</span>
                <span className="product-stock">In stock: {product.quantity}</span>
                <button className="btn">Add to Cart</button>
            </div>
            
        </div>
        
    </>
  
  )
}

export default ProductItemPage