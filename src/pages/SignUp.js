import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const postUser = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('http://localhost:8000/signup', { email, password, user_name, password2 });
            if (user.data.errors && user.data.errors.errors.length > 0) {
                const newErrors = {};
                user.data.errors.errors.forEach(error => {
                    newErrors[error.path] = error.msg;
                });
                setErrors(newErrors);
                setSuccessMessage('');
            } else {
                setErrors({});
                setSuccessMessage(user.data.result.message);

                toast.success('Account created successfully!' , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
              

                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            }
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <div className='signupPage container-fluid' style={{ backgroundColor: '#dee2e6' }}>

            <header className='row pb-3 bg-black text-white mb-4' >

                <NavLink to='/'><li className='fa fa-home text-white large  ' style={{ float: 'left', position: 'absolute', top: '20px', left: '15px' }} /></NavLink>
                <div className="mt-3">Join Us: Asian Store </div>
            </header>

            <div className='row'>
                <form className='form1 col-11  col-md-6 col-lg-4 mx-auto ' onSubmit={postUser} action='/' method='post'>
                    <NavLink to='/'>
                        <img src='/imgs/logo.png' id='icon' alt='Logo' />
                    </NavLink>
                    <br />
                    <input type="text" name="username" placeholder="enter your username." className='col-12' value={user_name} onChange={(e) => setUsername(e.target.value)} />
                    {errors.user_name && <span className="error text-danger">{errors.user_name}</span>}


                    <input type="email" name="email" placeholder="example@gmail.com." className='col-12' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className="error text-danger">{errors.email}</span>}


                    <input type="password" name="password" placeholder="type your password." className='col-12' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span className="error text-danger">{errors.password}</span>}


                    <input type="password" name="confirm password" placeholder="Confirm password." className='col-12' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    {errors.password2 && <span className="error text-danger">{errors.password2}</span>}

                    <hr className='mb-1' />
                    <button className="buttons col-12" type="submit">Sign Up</button>
                    {successMessage && <p className="success text-success ">{successMessage}</p>}
                </form>
    
            </div>
          
        </div>
    );
}
