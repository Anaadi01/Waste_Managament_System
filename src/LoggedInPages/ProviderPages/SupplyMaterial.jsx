import React, { useState } from 'react'
import useFetchAllCategories from '../../CommonFunction/useFetchAllCategories'
import Swal from 'sweetalert2';
import { callApi } from '../../Axios';

export default function SupplyMaterial() {
    let catgeories = useFetchAllCategories()
    console.log(catgeories)
     const [supplyData, setSupplyData] = useState({
    supplyDate: '',
    category: '',
    weight: '',
    address: '',
    area: '',
    pincode: '',
  });

    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplyData({
      ...supplyData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
      console.log('Supply Data:', supplyData);
      try {
          let createSupply = await callApi('createSupply', 'POST', supplyData);
          console.log(createSupply)
          Swal.fire({
        title: createSupply.message,
        timer: 2000,
        icon: 'success',
      });
      } catch (error) {
          console.log(error)
            Swal.fire({
        title: error.response.data.error,
        timer: 2000,
        icon: 'error',
      });
      }
           
    };
    

  return (
      <div className="container mt-4 col">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="supplyDate">Supply Date</label>
          <input
            type="date"
            className="form-control"
            id="supplyDate"
            name="supplyDate"
            value={supplyData.supplyDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={supplyData.category}
            onChange={handleChange}
                      required>
                       <option>Select Product</option>
                      {catgeories.length > 0
                      
                          ?
                        
                          catgeories.map(category =>
                              <option value={category.categoryName}>{category.categoryName}</option>)
                          :
                          <option>Select Product</option>
                      }
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (in Kgs)</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            value={supplyData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={supplyData.address}
            onChange={handleChange}
            required
          />
        </div>

       

        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={supplyData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
