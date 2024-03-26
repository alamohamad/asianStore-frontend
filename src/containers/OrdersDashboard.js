import React, { useState, useEffect } from 'react';
import authAxios from '../authAxios';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await authAxios.get('/orders');
      if (Array.isArray(response.data.result)) {
        setOrders(response.data.result);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response);
    }
  };

  useEffect(() => {fetchOrders(); }, []);





  const deleteOrder = async (order_id) => {
    if (confirmDelete && order_id === orderToDelete) {
        try {
          await authAxios.delete(`/orders/${order_id}`);
          setOrders(prevOrders =>
            prevOrders.filter(order => order.order_id !== order_id)
      
          );
          toast.success("Order deleted successfully!" ,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     
        } catch (error) {
            console.error("Error deleting order:", error.response);
            
        } finally {
            setConfirmDelete(false);
        }
    } else {
        setOrderToDelete(order_id);
        setConfirmDelete(true);
    }
};



 

  return (
    <div className='container-fluid containers employeeSections p-4'>
      <div className='row'>
        <div className='0 table-responsive'>
          <table className='table table-borderd col-12 col-md-6 dashboardTable'>
            <thead className='tableHeader'>
              <tr>
                <th>Order No.</th>
                <th>User Name</th>
                <th>Order Date</th>
                <th>Address</th>
                <th>Cost</th>
                <th>Phone number</th>
                <th/>


              </tr>
              
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td >{order.user_name}</td>
                  <td>{order.order_date}</td>
                  <td>{order.address}</td>
                  <td >{order.cost}</td>
                  <td >{order.phone_number}</td>



                  <td>
                    <button className='btn border btn-dark' onClick={() => deleteOrder(order.order_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      </div>

      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
                        <Modal.Header closeButton>

                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this order?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteOrder(orderToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>

    </div>
  );
};

export default OrdersDashboard;
