import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
//import '../data/backend-prac.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){
    try {
        //throw 'error1';
        await loadProductsFetch();
        await new Promise((resolve, reject) => {
            loadCart(() => {
                //reject('error3');
                resolve();
            });
        }) 
    } catch (error){ 
        console.errlogor('error');
    }

    renderOrderSummary();
    renderPaymentSummary();
    
}
loadPage();

/* Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
}) */

// Promise method  better way

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
}); */

// method 1 - becomes compilacted in largest scale
/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    })
}); */
