import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'

export default function Inventory() {

  const [inventory, setInventory] = useState([])
  useEffect(() => {
    const getInventory = async () => {
      let result = await callApi('getInventory', 'GET')
      console.log(result)
      setInventory(result.data)
    }
    getInventory();
  }, [])
  console.log(inventory)
  
  return (
   <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Current Material Available(Weight)</th>
            <th scope="col">Last Updated At</th>
          </tr>
        </thead>
        <tbody>
          {inventory &&
            inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.categoryName}</td>
                <td>{item.weight}  Kgs</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
