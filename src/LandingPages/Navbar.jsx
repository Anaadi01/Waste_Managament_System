import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './About.css'; // Import your custom stylesheet

export default function Navbar() {
  return (
    <div className='container-fluid p-0'>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Waste Management</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{justifyContent:'space-between'}}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/request-quotation">Request Quotation</Link>
              </li> */}
                  </ul>
                  <ul className="navbar-nav login_signup">
            <li className="nav-item">
              <Link className="nav-link" to="/login"> <button className='btn btn-primary' type='button'>Login</button></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup"> <button className='btn btn-primary' type='button'>Signup</button></Link>
            </li>
          </ul>
          </div>
        </nav>
      </div>
      <div style={{overflow:'auto', height:'85vh', scrollbarWidth:"none"}}>
        <Outlet />
        </div>
    </div>
  );
}
