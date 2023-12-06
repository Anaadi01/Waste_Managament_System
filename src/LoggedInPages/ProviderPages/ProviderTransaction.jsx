import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'

export default function ProviderTransaction() {
    const [supplies, setSupplies] = useState([])
    useEffect(() => {
        let getSupplies = async () => {
            let result = await callApi('getSupply', 'GET')
            setSupplies(result.data)
        }
        getSupplies()
    }, [])
    
  return (
      <div>ProviderTransaction
          
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
                </div>
              </div>
            </div>
          ))}
          </div>
    </div>
  )
}
