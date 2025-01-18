import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utlis/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deleveryOptions, getOption } from '../../data/deleveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';


const today = dayjs(); // Initialize once globally

export function renderOrderSummary(){
    let cartSummaryHTML = '';
    cart.forEach(cartItem => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        if (!matchingProduct) {
            console.error(`Product with ID ${productId} not found in products.`);
            return;
        }

        // Delivery option and date calculation
        const deliveryOptionId = cartItem.deleveryOptionsId;
        const deleveryOption = getOption(deliveryOptionId);

        if (!deleveryOption) {
            console.error(`Delivery option with ID ${deliveryOptionId} not found.`);
            return;
        }

        const deliveryDate = today.add(deleveryOption.deleveryDays, 'days');
        const deliveryDateStr = deliveryDate.format('dddd, MMMM, D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-${matchingProduct.id}">
                <div class="delivery-date">Delivery date: ${deliveryDateStr}</div>
                <div class="cart-item-details-grid">
                    <img
                        class="product-image"
                        src="${matchingProduct.image}"
                        alt="${matchingProduct.name}"
                    />
                    <div class="cart-item-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-price">${matchingProduct.getPrice()}</div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                            <span class="update-quantity-link link-primary js-product-update">Update</span>
                            <span class="delete-quantity-link link-primary js-product-delete" data-product-id="${matchingProduct.id}">Delete</span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });


    // Generate HTML for delivery options
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        return deleveryOptions.map(deleveryOption => {
            const deliveryDate = today.add(deleveryOption.deleveryDays, 'days');
            const deliveryDateStr = deliveryDate.format('dddd, MMMM, D');
            const priceString = deleveryOption.priceCents === 0
                ? 'Free'
                : `$${formatCurrency(deleveryOption.priceCents)} -`;

            const isChecked = deleveryOption.id === cartItem.deleveryOptionsId;

            return `
                <div class="delivery-option js-delivery-option "
                data-product-id = "${matchingProduct.id}"
                data-product-option-id = "${deleveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                        class="delivery-option-input" 
                        name="delivery-option-${matchingProduct.id}" 
                        value="${deleveryOption.id}"/>
                    <div>
                        <div class="delivery-option-date">${deliveryDateStr}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update the DOM with cart summary
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const deliveryOptionId = element.dataset.productOptionId;
            const productId = element.dataset.productId;
            //const {productId,deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });

    // Add event listeners for removing items
    document.querySelectorAll('.js-product-delete').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-${productId}`);
            if (container) {
                container.remove();
            } else {
                console.error(`Container for product ID ${productId} not found.`);
            }
            updateCartQuantity();

            renderPaymentSummary();      
        });
    });

    // Update cart quantity display
    function updateCartQuantity() {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-count-cart-items').innerHTML = `${cartQuantity} items`;
    }

    // Initial cart quantity display
    updateCartQuantity();
}

renderOrderSummary();