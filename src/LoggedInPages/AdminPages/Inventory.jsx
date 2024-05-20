import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import moment from 'moment'

export default function Inventory() {
  
  const [transaction, setTransaction] = useState([])
  let userId = localStorage.getItem('userId')
  const [inventory, setInventory] = useState([])
  useEffect(() => {
  const fetchData = async () => {
    try {
      const supplyResult = callApi('getSupply', 'POST', { userId: userId });
      const orderResult = callApi('getOrder', 'POST', { userId: userId });
      const inventoryResult = callApi('getInventory', 'GET');

      const [supplyData, orderData, inventoryData] = await Promise.all([
        supplyResult,
        orderResult,
        inventoryResult,
      ]);
      console.log(supplyData, "Here")
      console.log(orderData, "Here")
      // Combine supply and order data
      const combinedData = [...supplyData.data, ...orderData.data];

      // Create a set to track unique _id values
      const uniqueIds = new Set();

      // Filter out duplicates based on _id
      const filteredData = combinedData.filter((item) => {
        if (!uniqueIds.has(item._id)) {
          uniqueIds.add(item._id);
          return true;
        }
        return false;
      });

      setTransaction(filteredData);
      setInventory(inventoryData.data);
      sortTransactionByDate();
    } catch (error) {
      // Handle error
    }
  };

  if (userId) {
    fetchData();
  }
}, [userId]);

const sortTransactionByDate = () => {
  setTransaction((prevTransaction) =>
    prevTransaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
};


  console.log(inventory)
  return (
   <div className="container mt-4">
     <table className="table">
  <thead>
    <tr>
      <th scope="col">Transaction Id</th>
      <th scope="col">Client Name</th>
      <th scope="col">Transaction Date</th>
      <th scope="col">Category</th>
      <th scope="col">Inward</th>
      <th scope="col">Outward</th>
    </tr>
  </thead>
  <tbody>
    {transaction &&
      transaction.map((item, index) => (
        <tr key={index}>
          <td>{item._id}</td>
          <td>{item.clientName}</td>
          <td>
           {
  item.supplyDate
    ? moment(item.dropDownDate).format('DD-MM-YYYY')
    : item.orderDate
    ? moment(item.orderDate).format('DD-MM-YYYY')
    : ''
}

          </td>
          <td>{item.category}</td>
          <td>
            {item.supplyDate ? `${item.weight} Kgs` : ''}
          </td>
          <td>
            {!item.supplyDate ? `${item.weight} Kgs` : ''}
          </td>
        </tr>
      ))}
  </tbody>
</table>
      
 <table className="table">
  <thead>
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Total Weight Remaining In Stock (I Kg)</th>
    </tr>
  </thead>
  <tbody>
    {inventory &&
      inventory.map((item, index) => (
        <tr key={index}>
          <td>{item.categoryName}</td>
          <td>{item.weight}</td>
        </tr>
      ))}
  </tbody>
</table>



    </div>
  )
}
