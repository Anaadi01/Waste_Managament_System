import React, { useState } from 'react'

export default function Welcome() {
  
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    wasteType: '',
    weight: '',
    address: '',
    area: '',
    pincode: '',
    contactNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form Data Submitted:', formData);

    let result = api
    // You can send the data to your server or perform any other actions.
  };
  return (
        <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="organizationName">Organization Name:</label>
            <input type="text" className="form-control" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="wasteType">Type of Waste:</label>
            <input type="text" className="form-control" id="wasteType" name="wasteType" value={formData.wasteType} onChange={handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="weight">Weight of Waste:</label>
            <input type="text" className="form-control" id="weight" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="area">Area:</label>
            <input type="text" className="form-control" id="area" name="area" value={formData.area} onChange={handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="pincode">Pincode:</label>
            <input type="text" className="form-control" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="email">Email ID:</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>  )
}

