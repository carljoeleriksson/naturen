import { Product, ProductArr } from '../interfaces/interfaces'

export function getProductsFromLS() {
    const productListStr: string | null = localStorage.getItem('productList')
    
    if (!productListStr) {
        throw new Error("Can't find productList in Local Storage")
    }

    const productList: Array<ProductArr> = JSON.parse(productListStr)
    return productList
}

export function addProductToLS(newProduct: Product) {
    const currentProductList: any = getProductsFromLS()
    
    let isUpdate = false
    const updatedProductList = currentProductList.map((item: any) => {
        if(item.id === newProduct.id){
            item.name = newProduct.name
            item.description = newProduct.description
            item.shortDesc = newProduct.shortDesc
            item.price = newProduct.price
            item.image = newProduct.image
            item.stock = newProduct.stock
            
            isUpdate = true
            
            return item
        } 
        return item        
    })
    
    let newProductList = []
    if(!isUpdate) {
        newProductList = [...updatedProductList, newProduct]
    } else {
        newProductList = [...updatedProductList]
    }

    localStorage.setItem('productList', JSON.stringify(newProductList))
}

export function deleteProduct(product: Product) {
    const productsFromLS:any = localStorage.getItem('productList')
    let productList: any[] = JSON.parse(productsFromLS)
        
    const isProductList: boolean = typeof productList !== 'undefined' ? true : false;
    
    if(isProductList) {
        let newProductList = productList.filter(item => {
            return item.id !== product.id
          })
        localStorage.setItem('productList', JSON.stringify(newProductList))
        return newProductList
    } else {
        return productList
    }
}
