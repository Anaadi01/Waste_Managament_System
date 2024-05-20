import React, { useState } from 'react';
import useFetchAllCategories from '../../CommonFunction/useFetchAllCategories';
import Swal from 'sweetalert2';
import { callApi } from '../../Axios';
import { currentDate } from '../../CommonFunction/common';

export default function CustomerOrder() {
  const categories = useFetchAllCategories();
  const userId = localStorage.getItem('userId')
  const [orderData, setOrderData] = useState({
    userId:userId,
    orderDate: '',
    category: '',
    weight: '',
    address: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let createOrder = await callApi('createOrder', 'POST', orderData);
      console.log(createOrder);
      Swal.fire({
        title: createOrder.message,
        timer: 2000,
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
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
          <label htmlFor="orderDate">Order Date</label>
          <input
            type="date"
            className="form-control"
            id="orderDate"
            name="orderDate"
             min={currentDate}
            value={orderData.orderDate}
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
            value={orderData.category}
            onChange={handleChange}
            required
          >
            <option>Select Product</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.categoryName} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))
            ) : (
              <option>Select Product</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Quantity (In Kgs)</label>
          <input
            type="tel"
            className="form-control"
            id="weight"
            name="weight"
            value={orderData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Delivery Pincode</label>
          <input
            type="tel"
            className="form-control"
            id="pincode"
            name="pincode"
            value={orderData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
