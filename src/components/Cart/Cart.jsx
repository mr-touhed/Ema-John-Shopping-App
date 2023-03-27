import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
  
    let price = 0;
    let quantity = 0;
    let shipping = 0;
    
    for(const product of cart){
       
        price += product.price
        quantity += product.quantity;
        shipping+=product.shipping;

    }
    const tax = (price * 7 )/ 100;
    const grandTotal = price + tax 
   
    return (
        <div className='cart-section'>
            <h2>quentity {quantity}</h2>
            <p>Total Price: ${price}</p>
            <p>Total Shipping Charge: {shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;