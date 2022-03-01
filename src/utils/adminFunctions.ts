export function getProductsFromLS() {
    const productListStr: string | null = localStorage.getItem('productList')

    if (!productListStr) {
        throw new Error("Can't find productList in Local Storage")
    }

    const productList: Array<any> = JSON.parse(productListStr)
}