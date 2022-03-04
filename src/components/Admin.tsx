import React, { useEffect, useState } from 'react'
import { getProductsFromLS, deleteProduct } from '../utils/adminFunctions'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { Product, ProductArr } from '../interfaces/interfaces'
import CreateProductForm from '../components/CreateProductForm'

function Admin() {
    const [productList, setProductList] = useState<ProductArr>([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [productToEdit, setProductToEdit] = useState<Product>()

    function renderProducts() {
        return productList.map((product: Product) => (
            <li key={product.id}>
                <div className="cart-thumb-container">
                    <img className="cart-thumb" src={product.image} alt={product.name} />
                </div>
                <span className="cart-title">{product.name}</span>
                <span className="cart-desc">{product.shortDesc}</span>
                <span className="cart-price">{product.price}:-</span>
                <span className="cart-stock">I lager: {product.stock}</span>
                <button className="cart-delete icon-btn" onClick={() => handleDeleteClick(product)}><FaTrashAlt /></button>
                <button className="cart-edit icon-btn" onClick={() => handleEditClick(product)}><FaEdit /></button>
            </li>
        ))
    }

    function handleDeleteClick(product: Product) {
        const newProductList: any = deleteProduct(product)
        setProductList(newProductList)
    }

    function handleEditClick(product: Product) {
        setProductToEdit(product)
        setShowCreateForm(true)
    }

    function handleCreateFormClick() {
        if(!showCreateForm){
            console.log('Show!');
            
            setShowCreateForm(true)
        } else {
            setShowCreateForm(false)
        }
    }


    useEffect(() => {
        const currentProductList: any = getProductsFromLS()
        setProductList(currentProductList)

    }, [])

  return (<>
            <div className='cart-products'>
                {productList.length > 0 ? renderProducts() : <h2>Hittade inga produkter</h2>}
            </div>
            {showCreateForm && <><h2>Skapa ny produkt</h2><CreateProductForm product={productToEdit}/></>}
            <button onClick={handleCreateFormClick}>{!showCreateForm ? '+ Skapa ny produkt' : 'Avbryt'}</button>
        </>
  )
}

export default Admin