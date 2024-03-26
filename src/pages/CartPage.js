import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import OrderAlertForm from '../containers/OrderAlertForm';
import 'react-toastify/dist/ReactToastify.css';
import authAxios from '../authAxios';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


 

  useEffect(() => {
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity), 0);

      setTotalPrice(totalPrice);
      setTotalItems(totalItems);
    } else {
      setTotalPrice(0);
      setTotalItems(0);
    }
  }, [cartItems]);

  const fetchCartItems = async () => {
    const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('user_id');
    let localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    if (isLoggedIn) {
      try {
        await postLocalCartItems(localCartItems);
        localStorage.removeItem('cartItems');

        const response = await authAxios.get('/cart/items');
        const dbCartItems = response.data.result;
  
        const mergedCartItems = mergeCartItems(dbCartItems, localCartItems);
        setCartItems(mergedCartItems);
  
        localCartItems = mergedCartItems.filter(item => !item.cart_item_id);
        if (localCartItems.length > 0) {
          localStorage.setItem('cartItems', JSON.stringify(localCartItems));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    } else {
      setCartItems(localCartItems);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  const postLocalCartItems = async (localCartItems) => {
    for (const item of localCartItems) {
      try {
        await authAxios.post('/cart/add', {
          product_id: item.product_id,
          quantity: item.quantity,
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };
  
  const mergeCartItems = (dbCartItems, localCartItems) => {
    const mergedItems = [];
    mergedItems.push(...dbCartItems);
    localCartItems.forEach(item => {
      const existingItem = dbCartItems.find(dbItem => dbItem.product_id === item.product_id);
      if (!existingItem) {
        mergedItems.push(item);
      }
    });
    return mergedItems;
  };


  const deleteItem = async (item) => {
    console.log("Deleting item:", item);
    
    try {
        const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('user_id');
        if (!isLoggedIn) {
            const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedLocalStorageItems = localCartItems.filter(cartItem => cartItem.product_id !== item.product_id);
            console.log("Updated local cart items after deletion:", updatedLocalStorageItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageItems));
            setCartItems(updatedLocalStorageItems); 
        } else {
            if (item.cart_item_id) {
                await authAxios.delete(`/cart/items/${item.cart_item_id}`);
            } else {
                const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const updatedLocalStorageItems = localCartItems.filter(cartItem => cartItem.product_id !== item.product_id);
                console.log("Updated local cart items after deletion:", updatedLocalStorageItems);
                localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageItems));
            }
            setCartItems(prevItems =>
                prevItems.filter(cartItem => cartItem.cart_item_id !== item.cart_item_id)
            );
        }
    } catch (error) {
        console.error("Error deleting product:", error.response);
    } finally {
        setConfirmDelete(false);
        setItemToDelete(null);
    }
};


const increaseQuantity = async (index) => {
  const updatedCartItems = [...cartItems];
  updatedCartItems[index].quantity++;
  setCartItems(updatedCartItems);

  try {
    await authAxios.put(`/cart/items/${updatedCartItems[index].cart_item_id}`, { quantity: updatedCartItems[index].quantity });
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

const decreaseQuantity = async (index) => {
  const updatedCartItems = [...cartItems];
  if (updatedCartItems[index].quantity > 1) {
    updatedCartItems[index].quantity--;
    setCartItems(updatedCartItems);

    try {
      await authAxios.put(`/cart/items/${updatedCartItems[index].cart_item_id}`, { quantity: updatedCartItems[index].quantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
};



const toggleForm = () => {
  const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('user_id');

  if (!isLoggedIn) {
    setShowModal(true);
  }
  else {
    setShowForm(!showForm);
    
  }
};



  
  


  const handleDeleteConfirmation = (cart_item_id) => {
    setItemToDelete(cart_item_id);
    setConfirmDelete(true);
  };

  return (
    <div className='container-fluid cartPageContainer'>
      <div className='row'>
        <h3 className='mt-3'>My Cart</h3>
        <p style={{ fontSize: '14px' }}>Your shopping cart is a reflection of your desires</p>
      </div>
      <div>
        <div>Total Price: {totalPrice.toFixed(2)}$</div>
        <div>Number of Items: {totalItems}</div>
      </div>
      <div className='row table-responsive'>
        <div className='col-12 col-md-10 mx-auto'>
          <table className='table cart-table col-6 dashboardTable'>
            <thead>
              <tr className='tableHeader'>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
    {cartItems.length > 0 ? (
      cartItems.map((item, index) => (
        <tr key={index} className='cart-item'>
          <td>
            <img className='img-fluid' src={`http://localhost:8000/uploads/products/${item.image_name}`} style={{ width: '80px' }} alt='Product' />
            <br />
            {item.product_name}
          </td>
          <td>
            <div className='quantity-container mx-auto mt-3'>
              <span className='quantity-btn' onClick={() => decreaseQuantity(index)}>-</span>
              <span>{item.quantity}</span>
              <span className='quantity-btn' onClick={() => increaseQuantity(index)}>+</span>
            </div>
          </td>
          <td className='pt-3'>{item.price}$</td>
          <td><i className="fa fa-trash trashIcon mt-2" aria-hidden="true" onClick={() => handleDeleteConfirmation(item)}></i></td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center">No items selected</td>
      </tr>
    )}
  </tbody>
          </table>

          <button className='btn btn-dark d-flex mt-2 mb-3' onClick={toggleForm}>Order Now</button>

          {showForm && (
            <div className="alert-overlay ">
              <div className="alert-content col-10 col-md-6 col-lg-4 orderForm">
                <OrderAlertForm toggleForm={toggleForm} cartItems={cartItems} totalPrice={totalPrice} />
              </div>
            </div>
          )}

        </div>
      </div>
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <Modal.Header closeButton>
           <Modal.Title>Confirm Deletion</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           Are you sure you want to delete this item?
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
           <Button variant="danger" onClick={() => deleteItem(itemToDelete)}>Delete</Button>
         </Modal.Footer>
       </Modal>


       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You must log in first to order.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="dark" onClick={() => { setShowModal(false); navigate('/login'); }}>Login</Button>
                </Modal.Footer>
            </Modal>


     </div>
   );
 }