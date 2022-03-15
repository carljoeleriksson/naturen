import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ProductCard from './ProductCard'

function ProductList() {
    //make a product interface!
    const [allProducts, setAllProducts]: Array<any> = useState([])
    
    // set search query to empty string
    const [query, setQuery] = useState<string>("");
    
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
   
        } else {
            setAllProducts(JSON.parse(productListFromLS))
        }
        
    }

    function renderProductList() {
        //filter products by filter-string (query)
        let filteredProducts = allProducts.filter((product: any) => (product.name)
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        
        return filteredProducts.map((product: any) => (
            <ProductCard {...product} key={product.id}/>
        ))
    }


    useEffect(() => {
        try {
            fetchProductList()
        }
        catch (error) {
            console.log("No products were found")
        }
    }, [])

  return (<>
        <div className="search-container">
            <FaSearch />
            <input 
                type="search" 
                name="search-form" 
                id="search-form" 
                className="search-input"
                placeholder="Search for something..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
        <section className="product-list">
            {allProducts.length > 0 && renderProductList()}
        </section>
        
  </>
  )
}

export default ProductList