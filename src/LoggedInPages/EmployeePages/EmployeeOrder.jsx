import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import Swal from 'sweetalert2'
import Modal from 'react-modal';
import moment from 'moment';
import { currentDate } from '../../CommonFunction/common';

export default function EmployeeOrder() {
  const [supplies, setSupplies] = useState([])
  const [toggle, setToggle] = useState(false)
  let userId =localStorage.getItem('userId')
    useEffect(() => {
      let getSupplies = async () => {
          let result = await callApi('getOrder', 'POST',{userId:userId})
          let data = result.data
          data = data.filter(item => item.status === 'Accepted' || item.status === 'Picked Up' || item.status === 'Delivered');
          console.log(data)
            setSupplies(data)
      }
      if (userId) {
        
        getSupplies()
      }
    }, [toggle, userId])
  
  
  const [pickedModal, setPickedModal] = useState(false)
  const [dropModal, setDropModal] = useState(false)
const [pickUpId, setPickUpId] = useState('')
const [dropDownId, setDropDownId] = useState('')

  const handleSetPickUpId = (id) => {
    setPickedModal(true)
    setPickUpId(id)
  }
  const handleSetDropDownId = (id) => {
    setDropModal(true)
    setDropDownId(id)
    console.log(dropDownId, id)
  }


  const handlePickUp = async (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)
    const orderId =   pickUpId
    const pickedUpDate = formData.get('pickedUpDate')
    const pickedUpPlace = formData.get('pickedUpPlace')
   
     let result = await callApi('orderPickedUpStatus', 'POST', { orderId, pickedUpDate,pickedUpPlace})
     setToggle(!toggle)
       Swal.fire({
         title: result.message,   
         icon: 'success',
            timer:3000
       })
    setPickedModal(false)
  }
  const handleDropDown = async (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)
    const orderId = dropDownId
    const delieveredDate = formData.get('delieveredDate')
    const delieveredPlace = formData.get('delieveredPlace')
     let result = await callApi('orderDeliveryStatus', 'POST', { orderId, delieveredDate,delieveredPlace})
     setToggle(!toggle)
       Swal.fire({
         title: result.message,   
         icon: 'success',
            timer:3000
       })
    setDropModal(false)
  }

  console.log(pickedModal)
    
  return (
      <div>
    <h2>Transaction Details</h2>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Weight</th>
          <th>Address</th>
          <th>Pincode</th>
          <th>Status</th>
          <th>Picked Up Date</th>
          <th>Picked Up Place</th>
          <th>Delivered Date</th>
          <th>Delivered Place</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {supplies.length > 0 &&
          supplies.map((supply, index) => (
            <tr key={index}>
              <td>{supply.clientName}</td>
              <td>{supply.category}</td>
              <td>{moment(supply.orderDate).format('DD-MM-YYYY')}</td>
              <td>{supply.weight}</td>
              <td>{supply.address}</td>
              <td>{supply.pincode}</td>
              <td>{supply.status}</td>
              <td>{moment(supply.pickedUpDate).format('DD-MM-YYYY')}</td>
              <td>{supply.pickedUpPlace}</td>
              <td>{moment(supply.delieveredDate).format('DD-MM-YYYY')}</td>
              <td>{supply.delieveredPlace}</td>
              <td>
                <div className="btn-group" role="group" style={{display:'flex', flexDirection:'column'}}>
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={supply.pickedUpDate}
                    onClick={() => handleSetPickUpId(supply._id)}
                  >
                    Picked Up
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={
                      supply.delieveredPlace
                        ? true
                        : supply.pickedUpDate
                        ? false
                        : true
                    }
                    onClick={() => handleSetDropDownId(supply._id)}
                  >
                    Delivered
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
        
       <Modal
        isOpen={pickedModal}
        onRequestClose={() => setPickedModal(false)}
        contentLabel="Pick Up Modal"
      >
        <h5>Pick Up Form</h5>
       <form onSubmit={handlePickUp}>
          <label>Pick Up Date</label>
          <input className=' form-control w-100' type='date' name='pickedUpDate'
          min={currentDate}
          max={currentDate}
          />
          <label className='mt-4'>Pick Up Place</label>
          <select className='form-control w-100 mb-4' name='pickedUpPlace' required>
  <option value=''>Select Pick Up Place</option>
  <option value='Station Road, Kota'>Station Road, Kota</option>
  <option value='Dadabari, Kota'>Dadabari, Kota</option>
  {/* Add more options as needed */}
</select>
          <button type='submit' className='btn btn-primary w-100'>Submit</button>
        </form>
      </Modal>
       <Modal
        isOpen={dropModal}
        onRequestClose={() => setDropModal(false)}
        contentLabel="Delivered Modal"
      >
        <h5>Delivery Form</h5>
       <form onSubmit={handleDropDown}>
          <label>Delivered Date</label>
          <input className='form-control w-100' type='date' name='delieveredDate'
             min={currentDate}
          max={currentDate}/>
          <label className='mt-4'>Delivered Place</label>
          <textarea className='w-100 form-control  mb-4' type='text' name='delieveredPlace' />
          <button type='submit' className='btn btn-primary w-100'>Submit</button>
        </form>
      </Modal>
          </div>

  )
}
