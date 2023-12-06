import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Form.css' 
import { Link } from 'react-router-dom';
const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [email, setEmail] = useState('')
const [typeOfEmployee, setTypeOfEmployee] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault();

        // Perform your registration logic here
        let apiCall=""
        try {
            apiCall = await axios.post('http://localhost:3000/api/register',{
                firstName,
                lastName,
                mobileNumber,
                address,
                pincode,
                password,
                email,
                typeOfEmployee
            })
        Swal.fire({
            title:apiCall.data.message,
            icon:'success',
            timer:3000
        })
        } catch (error) {
            Swal.fire({
                title:error.response.data.error,
                icon:'error',
                timer:3000
            })
        }

      
        console.log(apiCall)
    };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    return (
        <div className="container-fluid col mt-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="typeOfEmployee">Select Type Of User:</label>
                    <select
                    className="form-control"
                        id="typeOfEmployee"
                        required
                        onChange={(e) => setTypeOfEmployee(e.target.value)}
                    >
                        <option value={null}> Select Role </option>
                        <option value={"Employee"}> Employee </option>
                        <option value={"Customer"}> Customer </option>
                        <option value={"Provider"}> Provider </option>
                        
                   </select>
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mobileNumber"
                        pattern="[0-9]{10}"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        pattern="[0-9]{6}"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </div>
              <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <i class="fa-regular fa-eye-slash"></i>: <i class="fa-solid fa-eye"></i>}
              </button>
            </div>
          </div>
        </div>
               <div className="row px-3" style={{display:'flex', flexDirection:'row', justifyContent:"flex-end"}}>
                <button type="submit"  className="btn btn-primary w-100">
                    Submit
                </button>
                    <Link className='mt-2' to='/login'>Click Here To Login</Link>
                    </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
