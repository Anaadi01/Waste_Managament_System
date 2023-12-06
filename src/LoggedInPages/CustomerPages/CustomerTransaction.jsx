import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'

export default function CustomerTransaction() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        let getOrders = async () => {
            let result = await callApi('getOrder', 'GET')
            setOrders(result.data)
        }
        getOrders()
    }, [])
    
  return (
    <div>
      Customer Transaction
          
          <div>
                {orders.length > 0 &&
          orders.map((order, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Category:</strong> {order.category}
                  </p> 
                  <p className="card-text">
                    <strong>Date:</strong> {order.orderDate}
                  </p>
                  <p className="card-text">
                    <strong>Weight:</strong> {order.weight}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {order.address}
                  </p>
                  
                  <p className="card-text">
                    <strong>Pincode:</strong> {order.pincode}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
    </div>
  )
}
