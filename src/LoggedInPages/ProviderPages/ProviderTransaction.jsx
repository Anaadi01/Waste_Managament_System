import React, { useEffect, useState } from 'react'
import { callApi } from '../../Axios'
import SupplyTable from '../../CommonFunction/SupplyTable'

export default function ProviderTransaction() {
    const [supplies, setSupplies] = useState([])
    let userId =localStorage.getItem('userId')
    useEffect(() => {
      let getSupplies = async () => {
            let result = await callApi('getSupply', 'POST', {userId:userId} )
            setSupplies(result.data)
      }
      if (userId) {
        
        getSupplies()
      }
    }, [userId])
    
  return (
      <div>ProviderTransaction
          
          <div>
        <SupplyTable supplies={supplies} action={false} />
          </div>
    </div>
  )
}
