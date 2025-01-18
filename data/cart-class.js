
class Cart {
    cartItems;
    #localStorageKey;

    constructor (localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }
    
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity : 2,
                    deleveryOptionsId: '1',
                },
                {
                    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity : 1,
                    deleveryOptionsId: '2',
                }
            ];
        }
    }

    saveToLocalStorage (){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart (productId) {
        let matchingItem;
    
        this.cartItems.forEach(
            (cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        if (matchingItem){
            matchingItem.quantity += 1;
        }else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deleveryOptionsId: '1',
            });
        }
        this.saveToLocalStorage();
    }

    removeFromCart (productId ){
        const newCart =  [];
        this.cartItems.forEach(
        (cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToLocalStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId){ 
        let matchingItem;
    
        this.cartItems.forEach(
            (cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deleveryOptionsId = deliveryOptionId;
        this.saveToLocalStorage();
    }

}


const cart = new Cart('cart-oop');
const bCart = new Cart('cart-class');











