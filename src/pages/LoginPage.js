import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../components/UserProvider';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [errorCredential, setErrorCredential] = useState('');
    const {setCustomer} = useContext(userContext);


    const navigate = useNavigate();
  
    const postUser = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('http://localhost:8000/login', { email, password });
            console.log(user)


         

            if (user.data.errors && user.data.errors.errors.length > 0) {
                const newErrors = {};
                user.data.errors.errors.forEach(error => {
                    newErrors[error.path] = error.msg;
                });
                setErrors(newErrors);
                setErrorCredential('');
            } else if (user.data.error && user.data.error.length > 0) {
                setErrorCredential(user.data.error);
                setErrors({});
            } else {
                localStorage.setItem('user_id', user.data.user.user_id);
                localStorage.setItem('accessToken', user.data.accessToken);
                setCustomer(user.data.user.user_name);
                




                setErrors({});
                setErrorCredential('');
                console.log(user.data.user.user_name)
                toast("🌸 Welcome " + user.data.user.user_name+"!" ,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
              

                if (user.data.user.rule_id === 1) {
                    navigate('/adminDashboard');
                } else if (user.data.user.rule_id === 2) {
                    navigate('/employeesDashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <div className='signupPage container-fluid' style={{ backgroundColor: '#dee2e6', marginTop: '150px' }}>
            <div className='row text-center'>
                <div className='col-12 mb-4 mt-2 formheader'>Login: Asian Store</div>
            </div>
            <div className='row'>
                <form className='form1 col-11 col-md-6 col-lg-4 mx-auto' onSubmit={postUser} style={{ height: '410px' }}>
                    <NavLink to='/'><img id="icon" src="/imgs/logo.png" alt="notFound" /></NavLink>
                    <br />
                    <input type="email" name="email" placeholder="example@gmail.com." className='col-12 mt-5' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className="error text-danger">{errors.email}</span>}
                    <input type="password" name="password" placeholder="type your password." className='col-12 mt-3' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span className="error text-danger">{errors.password}</span>}
                    <hr className='mt-4' />
                    <button className="buttons col-12 mt-1 mb-1" type="submit">Login</button>
                    {errorCredential && <span className="text-danger">{errorCredential}</span>}
                    <br/>
                    <span className='mt-2' style={{fontSize:'14px'}}><label>Don't have an account?</label> <NavLink to={'/signup'} className='navLink'>Join now</NavLink></span>
                </form>
            </div>
        </div>
    );
}
