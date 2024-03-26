import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard(props) {
 const handleAddToCart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const existingItemIndex = cartItems.findIndex(item => item.product_id === props.product_id);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity++;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    toast('🛒 Quantity Updated Successfully!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    const newItem = {
      product_id: props.product_id,
      quantity: 1,
      image_name: props.image_name,
      product_name: props.product_name,
      price: props.price
    };
    const updatedCartItems = [...cartItems, newItem];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast('🛒 Added Successfully!!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};


  return (
    <div className='contanier-fluid bg-white productCard mb-3'>
    <div className='row'>
        <img src={`http://localhost:8000/uploads/products/${props.image_name}`} alt={props.product_name} />
        <div className='productCardInfo'>
            <p className='mb-3'>{props.product_name} <span>- {props.price}$</span></p>
            <br />
            <button className='addTocartBtn' onClick={handleAddToCart}><i className='fa fa-cart-plus' /><span className='s2'>Add to cart</span></button>
        </div>
    </div>
</div>
  );
}
