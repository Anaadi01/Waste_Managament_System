import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import Swal from 'sweetalert2'
import Modal from 'react-modal';
import moment from 'moment';
import { currentDate } from '../../CommonFunction/common';

export default function EmployeeTransaction() {
  const [supplies, setSupplies] = useState([])
  const [toggle, setToggle] = useState(false)
  let userId =localStorage.getItem('userId')
    useEffect(() => {
      let getSupplies = async () => {
          let result = await callApi('getSupply', 'POST', {userId:userId})
          let data = result.data
          data = data.filter(item => item.status === 'Accepted' ||item.status === 'Picked Up' || item.status === 'Completed');

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
    const supplyId =   pickUpId
    const pickedUpDate = formData.get('pickedUpDate')
    const pickedUpPlace = formData.get('pickedUpPlace')
   
     let result = await callApi('pickedUpStatus', 'POST', { supplyId, pickedUpDate,pickedUpPlace})
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
    const supplyId = dropDownId
    const dropDownDate = formData.get('dropDownDate')
    const dropDownPlace = formData.get('dropDownPlace')
   console.log(supplyId, dropDownDate,dropDownPlace)
     let result = await callApi('dropDownStatus', 'POST', { supplyId, dropDownDate,dropDownPlace})
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
            <th>Drop Down Date</th>
            <th>Drop Down Place</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplies.length > 0 &&
            supplies.map((supply, index) => (
              <tr key={index}>
                <td>{supply.clientName}</td>
                <td>{supply.category}</td>
                <td>{moment(supply.supplyDate).format('DD-MM-YYYY')}</td>
                <td>{supply.weight}</td>
                <td>{supply.address}</td>
                <td>{supply.pincode}</td>
                <td>{supply.status}</td>
                <td>{moment(supply.pickedUpDate).format('DD-MM-YYYY')}</td>
                <td>{supply.pickedUpPlace}</td>
                <td>{moment(supply.dropDownDate).format('DD-MM-YYYY')}</td>
                <td>{supply.dropDownPlace}</td>
                <td>
                  <div className="btn-group" role="group">
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
                        supply.dropDownDate
                          ? true
                          : supply.pickedUpDate
                          ? false
                          : true
                      }
                      onClick={() => handleSetDropDownId(supply._id)}
                    >
                      Drop Down
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
          <input className='form-control w-100 mb-4'
            min={currentDate}
          max={currentDate}
            type='date' name='pickedUpDate' />
          <label className='mt-4'>Pick Up Place</label>
          <textarea className='form-control w-100 mb-4' type='text' name='pickedUpPlace' />
          <button type='submit' className='btn btn-primary w-100'>Submit</button>
        </form>
      </Modal>
       <Modal
        isOpen={dropModal}
        onRequestClose={() => setDropModal(false)}
        contentLabel="Drop Down Modal"
      >
        <h5>Drop Down Form</h5>
       <form onSubmit={handleDropDown}>
          <label>Drop Down Date</label>
          <input className='form-control w-100 mb-4'
            min={currentDate}
          max={currentDate}
            type='date' name='dropDownDate' />
          <label className='mt-4'>Drop Down Place</label>
          <select className='form-control w-100 mb-4' name='dropDownPlace' required>
  <option value=''>Select Drop Down  Place</option>
  <option value='Station Road, Kota'>Station Road, Kota</option>
  <option value='Dadabari, Kota'>Dadabari, Kota</option>
  {/* Add more options as needed */}
</select>
          <button type='submit' className='btn btn-primary w-100'>Submit</button>
        </form>
      </Modal>
          </div>

  )
}
