import React, { useState, useContext } from 'react';
import authAxios from '../authAxios';
import { toast } from 'react-toastify';
import { employeeContext } from '../components/EmployeeContext';

const EmployeesAlertForm = () => {
    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({ user_name: '', email: '', password: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const { setEmployee } = useContext(employeeContext);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const postEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await authAxios.post('/users/employees', { email, password, user_name });
            if (response.data.errors && response.data.errors.errors.length > 0) {
                const newErrors = {};
                response.data.errors.errors.forEach(error => {
                    newErrors[error.path] = error.msg;
                });
                setErrorMessage(newErrors);
                setSuccessMessage('');
            } else {
                setErrorMessage({});
                setSuccessMessage(response.data.result.message);

             

                setEmployee({
                    user_id: response.data.result.user_id,
                    user_name: user_name,
                    email: email,
                    joining_date: response.data.result.joining_date
                });    

                toast.success(response.data.result.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error(error.response);
        }
    };
        
    return (
        <div className='container-fluid formCateg'>
            <div className='row'>
                <div className='form-container col-12 '>
                    <h6 className=' mt-2'>Add Employee</h6>
                    <form onSubmit={postEmployee} className='form'>
                        <div className='form-group'>
                            <label className='d-flex' htmlFor="userName">User Name:</label>
                            <input type="text" id="userName" value={user_name} onChange={handleUserNameChange} />
                            {errorMessage.user_name && <span className="error text-danger">{errorMessage.user_name}</span>}
                        </div>
                        <div className='form-group'>
                            <label className='d-flex' htmlFor="email">Email:</label>
                            <input type="text" id="email" value={email} onChange={handleEmailChange} />
                            {errorMessage.email && <span className="error text-danger">{errorMessage.email}</span>}
                        </div>
                        <div className='form-group'>
                            <label className='d-flex ' htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                            {errorMessage.password && <span className="error text-danger">{errorMessage.password}</span>}
                        </div>
                        <button className='btn w-100 btn-dark mb-3' type="submit">Submit</button>
                        {successMessage && <div className="success mb-2">{successMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeesAlertForm;
