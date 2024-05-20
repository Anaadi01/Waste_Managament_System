import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Form.css'
const LoginForm = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        let apiCall="";
        try {
            apiCall = await axios.post('http://localhost:3000/api/login',{
            mobileNumber,
            password
            })
            console.log(apiCall)
            localStorage.setItem('userId', apiCall.data.data._id)
        Swal.fire({
            title: 'Welcome ' + apiCall.data.data.firstName+' '+apiCall.data.data.lastName,
            icon:'success',
            timer:3000
        })
            navigate(`/${apiCall.data.data.typeOfEmployee.toLowerCase()}/welcome`)
        } catch (error) {
            Swal.fire({
                title:error.response.data.error,
                icon:'error',
                timer:3000
            })
        }
        
    
    };

    return (
        <div className="container-fluid mt-5 col" >
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number / Email Id:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="row px-3" style={{display:'flex', flexDirection:'row', justifyContent:"flex-end"}}>
                <button type="submit"  className="btn btn-primary w-100">
                    Submit
                </button>
                    <Link className='mt-2' to='/signup'>Click Here To SignUp</Link>
                    </div>
            </form>
        </div>
    );
};

export default LoginForm;
