import React, { useState, useEffect } from 'react';
import authAxios from '../authAxios';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  
    const fetchCustomers = async () => {
      try {
        const response = await authAxios.get('/users/customers');
        if (Array.isArray(response.data.result)) {
          setCustomers(response.data.result);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error.response);
      }
    };
    
    useEffect(() => {
    fetchCustomers();
  }, []);


  const deleteCustomer = async (user_id) => {
    if (confirmDelete && user_id === customerToDelete) {
        try {
            await authAxios.delete(`/users/${user_id}`);
            setCustomers(prevCustomers =>
              prevCustomers.filter(customer => customer.user_id !== user_id)
              
            );
            toast.success("Customer deleted successfully!" ,{
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
            console.error("Error deleting customer:", error.response);
        } finally {
            setConfirmDelete(false);
        }
    } else {
        setCustomerToDelete(user_id);
        setConfirmDelete(true);
    }
};



  return (
    <div className='container-fluid containers employeeSections p-4'>
      <div className='row table-responsive'>
       
          <table className='table table-borderd col-12 dashboardTable'>
            <thead className='tableHeader'>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Joining date</th>
                <th/>

              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.user_id}>
                  <td>{customer.user_id}</td>
                  <td>{customer.user_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.joining_date}</td>
                  <td>
                    <button className='btn border btn-dark' onClick={() => deleteCustomer(customer.user_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>

        <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
                        <Modal.Header closeButton>

                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this customer?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteCustomer(customerToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
     
    </div>
  );
};

export default CustomersDashboard;
