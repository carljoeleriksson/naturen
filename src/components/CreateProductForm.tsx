import React from 'react'
import {getProductsFromLS, addProductToLS} from '../utils/adminFunctions'
import {Product, ProductArr} from '../interfaces/interfaces'

function CreateProductForm(props: any) {
    const isProductToEdit = props.product ? true : false;
    let productToEdit = props.product
    
    
    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        console.log('Submit');
        
        const productList: any = getProductsFromLS()
        //Get the highest Id in product-list
        const arrOfIds = productList.map((product: Product) => product.id)
        let highestId = Math.max(...arrOfIds) ?? 0;

        const target = e.target as typeof e.target & {
            name: {value: string};
            description: {value: string};
            shortDesc: {value: string};
            price: {value: number};
            image: {value: string};
            stock: {value: number};
        };
        const newProduct: Product = {
            id: (!isProductToEdit) ? highestId + 1 : productToEdit.id,
            name: target.name.value,
            description: target.description.value,
            shortDesc: target.shortDesc.value,
            price: target.price.value,
            image: target.image.value,
            stock: target.stock.value,
            qty: 0
        }

        addProductToLS(newProduct)
        window.location.reload()
    }
return (<>
            <form onSubmit={e => handleSubmit(e)} className='create-product-form'>
                <label htmlFor="new-title">Produktnamn: </label>
                <input id="new-title" name="name" type="text" defaultValue={isProductToEdit ? productToEdit.name : ''} required/>   
                <label htmlFor="new-price">Pris: </label>
                <input id="new-price" name="price" type="number" defaultValue={isProductToEdit ? productToEdit.price : ''} required/>   
                <label htmlFor="new-desc">Beskrivning: </label>
                <textarea id="new-desc" name="description" maxLength={140} rows={4} defaultValue={isProductToEdit ? productToEdit.description : ''} required></textarea>
                <label htmlFor="new-short-desc">Kort beskrivning: </label>
                <input id="new-short-desc" name="shortDesc" type="text" defaultValue={isProductToEdit ? productToEdit.shortDesc : ''} required/>
                <label htmlFor="new-stock">Antal i lager: </label>
                <input id="new-stock" name="stock" type="number" defaultValue={isProductToEdit ? productToEdit.stock : ''} required/>   
                <label htmlFor="new-image">Bild-länk: </label>
                <input id="new-image" name="image" type="text" defaultValue={isProductToEdit ? productToEdit.image : ''} required/>  
                <button>{!productToEdit ? 'Lägg till produkt' : 'Utför ändring'}</button> 
            </form>

</>
  )
}


/* "id": 1,
"name": "Isbubbla",
"description": "En såpbubbla som varar för evigt (så länge den förvaras i -50 och inte vidrörs",
"shortDesc": "Frusen såpbubbla",
"price": 199,
"image": "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1961&q=80",
"stock": 10, */


export default CreateProductForm