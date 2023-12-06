import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import Swal from 'sweetalert2'
import Modal from 'react-modal';

export default function EmployeeTransaction() {
  const [supplies, setSupplies] = useState([])
  const [toggle, setToggle] = useState(false)
    useEffect(() => {
        let getSupplies = async () => {
          let result = await callApi('getSupply', 'GET')
          let data = result.data
          data = data.filter(item => item.status === 'Accepted' ||item.status === 'Picked Up' || item.status === 'Completed');

            setSupplies(data)
      }
  
        getSupplies()
    }, [toggle])
  
  
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
  }

  console.log(pickedModal)
    
  return (
    <div>Transaction
      <div>
                {supplies.length > 0 &&
          supplies.map((supply, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Category:</strong> {supply.category}
                  </p> 
                  <p className="card-text">
                    <strong>Date:</strong> {supply.supplyDate}
                  </p>
                  <p className="card-text">
                    <strong>Weight:</strong> {supply.weight}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {supply.address}
                  </p>
               
                  <p className="card-text">
                    <strong>Pincode:</strong> {supply.pincode}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {supply.status}
                  </p>
                  {
                    supply.pickedUpDate
                    &&
                  <p className="card-text">
                    <strong>Picked Up Date:</strong> {supply.pickedUpDate}
                  </p>
                    
                  }
                  {
                    supply.pickedUpPlace
                    &&
                  <p className="card-text">
                    <strong>Picked Up Place:</strong> {supply.pickedUpPlace}
                  </p>
                    
                  }
                  {
                    supply.dropDownDate
                    &&
                  <p className="card-text">
                    <strong>Drop Down Date:</strong> {supply.dropDownDate}
                  </p>
                    
                  }
                  {
                    supply.dropDownPlace
                    &&
                  <p className="card-text">
                    <strong>Drop Down Place:</strong> {supply.dropDownPlace}
                  </p>
                    
                  }
                  <div className="btn" style={{display:'flex',justifyContent:'space-evenly'}} role="group">
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
                      disabled={supply.dropDownDate?true:supply.pickedUpDate?false:true}
                      onClick={() => handleSetDropDownId(supply._id)}
                    >
                      Drop Down 
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        
       <Modal
        isOpen={pickedModal}
        onRequestClose={() => setPickedModal(false)}
        contentLabel="Pick Up Modal"
      >
        <h5>Pick Up Form</h5>
       <form onSubmit={handlePickUp}>
          <label>Pick Up Date</label>
          <input className='w-100' type='date' name='pickedUpDate' />
          <label className='mt-4'>Pick Up Place</label>
          <textarea className='w-100' type='text' name='pickedUpPlace' />
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
          <input className='w-100' type='date' name='dropDownDate' />
          <label className='mt-4'>Drop Down Place</label>
          <textarea className='w-100' type='text' name='dropDownPlace' />
          <button type='submit' className='btn btn-primary w-100'>Submit</button>
        </form>
      </Modal>
          </div>

    </div>
  )
}
