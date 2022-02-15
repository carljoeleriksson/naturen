import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function ProductList() {
    //make a product interface!
    const [allProducts, setAllProducts]: Array<any> = useState([])
    const [currentProducts, setCurrentProducts]: Array<any> = useState([])
    
    const fetchProductList = async () => {
        let productListFromLS:any = localStorage.getItem('productList')
  
        if(!productListFromLS){
            //Get default list of products from JSON-file
            const importedProducts = await import("../naturenProducts.json");
                  
            let defaultProducts: Array<any>= []
            defaultProducts = importedProducts.default
  
            //Save default meetups in localStorage
            localStorage.setItem('productList', JSON.stringify(defaultProducts))
            setAllProducts(defaultProducts)
            setCurrentProducts(defaultProducts)

        } else {
            setAllProducts(JSON.parse(productListFromLS))
            setCurrentProducts(JSON.parse(productListFromLS))
        }
        
    }

    function renderProductList() {
        return currentProducts.map((product: any) => (
            <ProductCard {...product} key={product.id}/>
        ))
    }

    useEffect(() => {
        try {
            fetchProductList()
        }
        catch (error) {
            console.log(error)
        }
    }, [])

  return (<>
        <section className="product-list">
            {currentProducts.length > 0 && renderProductList()}
        </section>
        
  </>
  )
}

export default ProductList