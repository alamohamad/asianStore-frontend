import React, { useState, useEffect, useContext } from 'react';
import authAxios from '../authAxios';
import { Modal, Button } from 'react-bootstrap';
import EmployeesAlertForm from './EmployeesAlertForm';
import { employeeContext } from '../components/EmployeeContext';
import { toast } from 'react-toastify';

const EmployeesDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [employees, setEmployees] = useState([]);
    const { employee } = useContext(employeeContext);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const fetchEmployees = async () => {
        try {
            const response = await authAxios.get('/users/employees');
            if (Array.isArray(response.data.result)) {
                setEmployees(response.data.result); 
            } else {
                console.error("Invalid response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching employees:", error.response);
        }
    };
    
    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (employee) {
            setEmployees(prevEmployees => [...prevEmployees, employee]);
        }
    }, [employee]);

    const deleteEmployee = async (user_id) => {
        if (confirmDelete && user_id === employeeToDelete) {
            try {
                await authAxios.delete(`/users/${user_id}`);
                setEmployees(prevEmployees =>
                    prevEmployees.filter(employee => employee.user_id !== user_id)
               
                );
                toast.success("Employee deleted successfully!" ,{
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
                console.error("Error deleting employee:", error.response);
            } finally {
                setConfirmDelete(false);
            }
        } else {
            setEmployeeToDelete(user_id);
            setConfirmDelete(true);
           
        }
    };

    return (
        <div className='container-fluid containers employeeSections p-4'>
            <div className='row'>
                <div className='0 table-responsive'>
                    <button className='btn btn-dark d-flex mb-2' onClick={toggleForm}>Add Employee</button>

                    <table className='table  table-borderd col-12 col-md-6 dashboardTable'>
                        <thead className='tableHeader'>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Email</th>
                                <th>Joining date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.user_id}>
                                    <td>{employee.user_id}</td>
                                    <td>{employee.user_name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.joining_date}</td>
                                    <td>
                                        <button className='btn border btn-dark' onClick={() => deleteEmployee(employee.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showForm && (
                        <div className="alert-overlay">
                            <div className="alert-content col-10 col-md-6 col-lg-4">
                                <EmployeesAlertForm/>
                                <button className='btn mt-1' onClick={toggleForm}>Close</button>
                            </div>
                        </div>
                    )}

                    <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this employee?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            <Button variant="danger" onClick={() => deleteEmployee(employeeToDelete)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default EmployeesDashboard;
