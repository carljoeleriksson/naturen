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
    let newProductList = [...currentProductList, newProduct]
    console.log('newProductList: ', newProductList);

    localStorage.setItem('productList', JSON.stringify(newProductList))
}

export function deleteProduct(product: Product) {
    console.log('Delete product');
    const productsFromLS:any = localStorage.getItem('productList')
    let productList: any[] = JSON.parse(productsFromLS)
        
    let prodItem: any = {...product}
    const isProductList: boolean = typeof productList !== 'undefined' ? true : false;
    
    if(isProductList) {
        let newProductList = productList.filter(item => {
            return item.id != product.id
          })
        localStorage.setItem('productList', JSON.stringify(newProductList))
        return newProductList
    } else {
        return productList
    }
}

function deleteFromLocalStorage(product: Product, productList: ProductArr) {
    
}
