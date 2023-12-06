import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import Swal from 'sweetalert2'

export default function Transaction() {
  const [supplies, setSupplies] = useState([])
  const [toggle, setToggle] = useState(false)
    useEffect(() => {
        let getSupplies = async () => {
            let result = await callApi('getSupply', 'GET')
            setSupplies(result.data)
      }
  
        getSupplies()
    }, [toggle])
  
  const [orders, setOrders] = useState([])
    useEffect(() => {
        let getOrders = async () => {
            let result = await callApi('getOrder', 'GET')
            setOrders(result.data)
      }
  
        getOrders()
    }, [toggle])
  
  
   const handleChangeSupplyStatus = async(supplyId, status) => {
     // Handle the logic for accepting the request
     let result = await callApi('changeStatusAdmin', 'POST', { status,supplyId})
     setToggle(!toggle)
       Swal.fire({
         title: result.message,   
         icon: 'success',
            timer:3000
        })
  };
   const handleChangeOrderStatus = async(orderId, status) => {
     // Handle the logic for accepting the request
     let result = await callApi('changeOrderStatusAdmin', 'POST', { status,orderId})
     setToggle(!toggle)
       Swal.fire({
         title: result.message,   
         icon: 'success',
            timer:3000
        })
  };

  const [page, setPage] = useState("Orders")
 
    console.log(page)
  return (
    <div>Transaction
      <div>
<div style={{display:'flex', justifyContent:"",padding:'10px'}}>
          <button style={{ marginRight:'10px'}} className='btn btn-primary' onClick={() => setPage("Orders")}>Orders</button> 
        <button className='btn btn-primary' onClick={()=>setPage("Supplies")}>Supplies</button>
</div>
        {
        page == "Supplies"
      &&
          
          supplies.length > 0 &&
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
                    supply.status == 'Request Send'
                    &&
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleChangeSupplyStatus(supply._id,"Accepted")}
                      >
                      Accept request
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleChangeSupplyStatus(supply._id,"Rejected")}
                      >
                      Reject request
                    </button>
                  </div>
                    }
                </div>
              </div>
            </div>
          ))}
        {
        page == "Orders"
      &&
          
          orders.length > 0 &&
          orders.map((supply, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Category:</strong> {supply.category}
                  </p> 
                  <p className="card-text">
                    <strong>Date:</strong> {supply.orderDate}
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
                    supply.status == 'Order Place'
                    &&
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleChangeOrderStatus(supply._id,"Accepted")}
                      >
                      Accept request
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleChangeOrderStatus(supply._id,"Rejected")}
                      >
                      Reject request
                    </button>
                  </div>
                    }
                </div>
              </div>
            </div>
          ))}
          </div>

    </div>
  )
}
