
export function getCurrentCart() {
    const cartFromLS:any = localStorage.getItem('cart')

    if(cartFromLS){
        const returnObj = {
            cart: JSON.parse(cartFromLS),
            cartTotal: getCartTotal(JSON.parse(cartFromLS))
        }
        
        return returnObj

    } else {
        return {
            cart: [],
            cartTotal: 0
        }
    }
}

export function getCartTotal(cartArr: any) {
    if(cartArr.length !== 0) {
        let prices: number[] = []
        
        //Put all cart prices in an array
        cartArr.forEach((item: any) => {
            prices = [...prices, (item.price * item.qty)];
        });
        
        const cartSum = prices.reduce((prev, curr) => prev + curr)

        return cartSum
    }
}

export function setToLocalStorage(prodItem: any, prodArr:any, cartArr?:any) {
    
    let newCartItem: any = {...prodItem}
    const isCartArr: boolean = typeof cartArr !== 'undefined' ? true : false;
    console.log('isCartArr: ', isCartArr);
    console.log('prodItem.qty: ', prodItem.qty)
    
    //If cartArr exists and more than 1 product already exists in cart
    if(isCartArr && prodItem.qty > 1){
        //remove the object from cart 
        const filteredCart = cartArr.filter((item:any) => {
            return item.id !== prodItem.id;
        })
        const updatedCart:any = [newCartItem, ...filteredCart]
        localStorage.setItem('cart', JSON.stringify(updatedCart))

    //If cartArr exists and its only one 
    } else if (isCartArr && prodItem.qty === 1) {
        const filteredCart = cartArr.filter((item:any) => {
            return item.id !== prodItem.id;
        })
        const updatedCart:any = [newCartItem, ...filteredCart]
        localStorage.setItem('cart', JSON.stringify(updatedCart))

    } else if (!isCartArr){
        console.log('!isCartArr');
        
        const updatedCart:any = [newCartItem]
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    } 
    
    //UPDATE The productList stock status.
    //remove the object from productLlist
    const filteredProducts = prodArr.filter((item:any) => {
        return item.id !== prodItem.id;
    })
    newCartItem.qty = 0
    const newProductList:any = [newCartItem, ...filteredProducts]
    localStorage.setItem('productList', JSON.stringify(newProductList))
}



export function deleteFromLocalStorage(prodItem: any, prodArr:any, cartArr?:any) {
    let cartItem: any = {...prodItem}
    const isCartArr: boolean = typeof cartArr !== 'undefined' ? true : false;
    
    if(isCartArr) {        
        prodItem.stock += cartItem.qty
        cartItem.qty = 0

        const filteredCart = cartArr.filter((item:any) => {
            return item.id !== prodItem.id;
        })
        localStorage.setItem('cart', JSON.stringify(filteredCart))
    }
     //UPDATE The productList stock status.
    //remove the object from productLlist
    const filteredProducts = prodArr.filter((item:any) => {
        return item.id !== prodItem.id;
    })
    prodItem.qty = 0
    const newProductList:any = [prodItem, ...filteredProducts]
    localStorage.setItem('productList', JSON.stringify(newProductList))
}

export function addToCart(prodItem: any) { 
     
    //Get current cart from localStorage
    const cartFromLS:any = localStorage.getItem('cart')
    let currentCart: any[] = JSON.parse(cartFromLS)
    const productsFromLS:any = localStorage.getItem('productList')
    let productList: any[] = JSON.parse(productsFromLS)

    if(currentCart){
        //Find out if the item already in cart, and return it
        let itemInCart: any = {}
        itemInCart = alreadyInCart(prodItem, currentCart)
        
            
        if(!itemInCart && prodItem.stock > 0){
            let newItem = {...prodItem}
            newItem.qty++
            newItem.stock--

            setToLocalStorage(newItem, productList, currentCart)

        } else if(itemInCart.qty >= 0 && itemInCart.stock > 1) {
            let newItem = {...itemInCart}
            newItem.qty++
            newItem.stock--
            
            setToLocalStorage(newItem, productList, currentCart)

        } else if(itemInCart.stock === 1) {
            let newItem = {...itemInCart}
            newItem.qty++
            newItem.stock--
            
            setToLocalStorage(newItem, productList, currentCart)
            return false

        } else if(itemInCart.stock <= 0) {
            return false
        }

        
    } else {
        let newItem = {...prodItem}
        newItem.qty++
        newItem.stock--
        setToLocalStorage(newItem, productList)
    }
}

export function alreadyInCart(prodItem: any, currentCart: any[]) {
    //Check if product already in cart
    let itemInCart = currentCart.filter((cartItem: any) => (cartItem.name)
            .toLowerCase()
            .includes(prodItem.name.toLowerCase())
    )
    return (itemInCart[0])
}

export function checkIfLoggedIn(){
    let userRole = sessionStorage.getItem('auth');
    const loggedInObj = {
        isLoggedIn: userRole === 'admin' || userRole === 'user' ? true : false,
        role: userRole
    }
    return loggedInObj
}