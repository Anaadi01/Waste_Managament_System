import React, { useState } from 'react'
import { callApi } from '../../Axios';
import Swal from 'sweetalert2';

export default function Category() {
  const [categoryName, setCategoryName] = useState('');
const [category, setCategory] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here

    // For demonstration purposes, log the category name to the console
    try {
        let categoryAdd = await callApi('addCategory', 'POST', {categoryName})
      Swal.fire({
          title: categoryAdd.message,
          timer: 2000,
          icon:'success'
      })
    } catch (error) {
        console.log(error)
       Swal.fire({
            title: error.response.data.error,
            timer: 2000,
            icon: 'error'
        })
    }
       
  };
  

  const handleDeleteCategory = async (id) => {
    
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this category?');

  if (!isConfirmed) {
    // If the user clicks "Cancel" in the confirmation dialog, do nothing
    return;
  }
              let deleteCategory = await callApi('deleteCategory', 'DELETE', {categoryId:id})
  Swal.fire({
          title: deleteCategory.message,
          timer: 2000,
          icon:'success'
      })
    } catch (error) {
      Swal.fire({
        title: error.response.data.error,
        timer: 2000,
        icon: 'error',
      });
    }
  }

  const [allCategories, setAllCategories] = useState([])
  const handleShowAllCategories = async () => {
    // Add logic to fetch and display all categories
    setCategory(true)
    try {
      let allCategory = await callApi('getAllCategory', 'GET');
      // Display or use the retrieved categories as needed
      console.log('All Categories:', allCategory);
      setAllCategories(allCategory.data)
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
  <div className="container-fluid mt-4 col">
      <div className="mb-3" style={{display:"flex", justifyContent:"space-around"}}>
        <button
          type="button"
          className="btn btn-primary mx-4"
          onClick={handleShowAllCategories}
        >
          Show All Categories
        </button>
        <button type="button" className="btn btn-success mx-4"  onClick={()=>setCategory(false)}>
          Add Category
        </button>
      </div>
      {
        category ?
          <div>
        {allCategories &&
  allCategories.map((category) => (
    <div key={category._id} className="card mb-3">
      <div className="card-body" style={{width:"15rem", display:"flex", alignContent:'center', justifyContent:"space-around"}}>
        <p className="card-text m-0">{category.categoryName}</p>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteCategory(category._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}

      </div>
          :
  <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      }
    
    </div>
  );
}
