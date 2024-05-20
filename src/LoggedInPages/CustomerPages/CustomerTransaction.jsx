import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import OrderTable from '../../CommonFunction/OrderTable'

export default function CustomerTransaction() {
    const [orders, setOrders] = useState([])
    let userId =localStorage.getItem('userId')
    useEffect(() => {
      let getOrders = async () => {
            let result = await callApi('getOrder', 'POST',{userId:userId})
            setOrders(result.data)
      }
      if (userId) {
        
        getOrders()
      }
    }, [userId])
    
  return (
    <div>
      Customer Transaction
          
          <div>
        <OrderTable orders={orders} action={false} />
          </div>
    </div>
  )
}
