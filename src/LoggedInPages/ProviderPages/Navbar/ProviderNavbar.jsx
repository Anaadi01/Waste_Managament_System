import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './About.css'; // Import your custom stylesheet

export default function ProviderNavbar() {
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
                <Link className="nav-link" to="/provider/transaction">Transaction</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/provider/supplyMaterial">Supply Material</Link>
              </li>
            
                  </ul>
                  <ul className="navbar-nav login_signup">
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus"> <button className='btn btn-primary' type='button'>LogOut</button></Link>
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
