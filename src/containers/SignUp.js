import axios from 'axios';
import React, { useState } from 'react';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const postUser = async (e) => {

        e.preventDefault();
        try {
            const user = await axios.post('http://localhost:8000/signup', { email, password ,user_name, password2 });
            if (user.data.errors && user.data.errors.errors.length > 0) {
                const newErrors = {};
                user.data.errors.errors.forEach(error => {
                    newErrors[error.path] = error.msg;//'newErrors' to store error messages for each input field
                });
                setErrors(newErrors);
                setSuccessMessage('');//if errors exist, clear the success msg
            } else {
                setErrors({});
                setSuccessMessage(user.data.result.message);
                window.location.href='/';

            }
        } catch (err) {
            console.error(err.response);
        }
    }

    return (
        <div className='signupPage container-fluid' style={{backgroundColor:'#dee2e6'}}>
            <div className='row text-center'>
                <div className='col-12 mb-2 formheader'>Join Us: Asian Store</div>
            </div>
            <div className='row'>
                <form className='form1 col-11 mt-3 col-md-6 col-lg-4 mx-auto' onSubmit={postUser} action='/' method='post'>
                <img id="icon" src="/imgs/logo.png" alt="notFound"/>
                <br/>
                    <input type="text" placeholder="enter your username." className='col-12' value={user_name} onChange={(e) => setUsername(e.target.value)}/>
                    {errors.user_name && <span className="error text-danger">{errors.user_name}</span>}


                    <input type="email" placeholder="example@gmail.com." className='col-12' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {errors.email && <span className="error text-danger">{errors.email}</span>}


                    <input type="password" placeholder="type your password." className='col-12' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errors.password && <span className="error text-danger">{errors.password}</span>}


                    <input type="password" placeholder="Confirm password." className='col-12' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    {errors.password2 && <span className="error text-danger">{errors.password2}</span>}

                    <hr/>
                    <button className="buttons col-12" type="submit">Sign Up</button>
                    {successMessage && <p className="success text-success ">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}
