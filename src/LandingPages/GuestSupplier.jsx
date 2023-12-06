// WasteForm.js
import React, { useState } from 'react';

const GuestSupplier = () => {
  const [formData, setFormData] = useState({

    mobileNumber: '',
    wasteType: '',
    weight: '',
    areaAddress: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form Data Submitted:', formData);
    // You can send the data to your server or perform any other actions.
  };

  return (
      <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="text"
          className="form-control"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="wasteType">Type of Waste:</label>
        <input
          type="text"
          className="form-control"
          id="wasteType"
          name="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight of Waste:</label>
        <input
          type="text"
          className="form-control"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="area">Area:</label>
        <input
          type="text"
          className="form-control"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          className="form-control"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default GuestSupplier;
