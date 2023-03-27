import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(()=>{
        const savedCart = getShoppingCart()
        const savedProducts = []
        for(const id in savedCart){
           const cartProduct =  products.find(product => product.id === id)
           if(cartProduct){
            cartProduct.quantity = savedCart[id]
            savedProducts.push(cartProduct)
            setCart(savedProducts)
           }
           
        }
        
       
    },[products])
    const handleAddToCart = (product) => {
        // cart.push(product); 
        // const newCart = [...cart, product];
        let newCart = [];
        // check if present product there for update quantity 
        const exsist = cart.find(pd=> pd.id === product.id)
        if(!exsist){
            product.quantity = 1; // if card not exsist then quantity value add  1 
            newCart = [...cart,product]
            
        }else{
            exsist.quantity = exsist.quantity + 1; // if card exsist then update previous + 1
            const remaining = cart.filter(pd=> pd.id !== product.id); // filter with out present product 
            newCart =[...remaining,exsist] // updated new cart previous + present update product

        }
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <h4>Order Summary</h4>
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;