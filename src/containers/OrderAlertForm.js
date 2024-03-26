import React, { useState } from 'react';
import authAxios from '../authAxios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderAlertForm = ({ toggleForm, cartItems, totalPrice }) => {
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState({ address: '', phone_number:'' });
  const [successMessage, setSuccessMessage] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const postOrder = async (e) => {
    e.preventDefault();
    try {
      const user = await authAxios.post('/orders', { address, phone_number, cartItems });
      if (user.data.errors && user.data.errors.length > 0) {
        const newErrors = {};
        user.data.errors.forEach(error => {
          newErrors[error.path] = error.msg;
        });
        setErrorMessage(newErrors);
        setSuccessMessage('');
      } else {
        setErrorMessage({});
        setSuccessMessage(user.data.result.message);
        toast("📤 "+user.data.result.message , {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setAddress('');
        setPhoneNumber('');
      }
    } catch (err) {
      console.error(err.response);
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='form-container col-12'>
          <h6 className=' mt-2'>Order Now</h6>
          <form onSubmit={postOrder} className='form'>
            <span className='mr-5'> Total Price : {totalPrice.toFixed(2)}$</span>
            <div className='form-group'>
              <label className='d-flex' htmlFor="address">Address:</label>
              <input type="text" id="address" value={address} onChange={handleAddressChange} />
              {errorMessage.address && <span className="error text-danger">{errorMessage.address}</span>}
            </div>
            <div className='form-group'>
              <label className='d-flex' htmlFor="phoneNumber">Phone number:</label>
              <input type="text" id="phoneNumber" value={phone_number} onChange={handlePhoneNumberChange} />
              {errorMessage.phone_number && <span className="error text-danger">{errorMessage.phone_number}</span>}
            </div>
            <button className='btn w-100 btn-dark mb-3' type="submit">Submit</button>
            {successMessage && <div className="success mb-2">{successMessage}</div>}
            <button className='btn mb-2 mt-1' onClick={toggleForm}>Close</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderAlertForm;