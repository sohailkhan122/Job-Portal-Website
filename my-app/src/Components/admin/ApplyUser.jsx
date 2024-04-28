import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ApplyUser = () => {
  const [fatchAllApply, setfatchAllApply] = useState([])
  useEffect(() => {
    axios.get(
      "https://job-portal-website-x40p.onrender.com/fatchAllApply",
    ).then((response) => {
      setfatchAllApply(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-portal-website-x40p.onrender.com/singleApplydelete  /${id}`);
      axios.get(
        "https://job-portal-website-x40p.onrender.com/fatchAllApply",
      ).then((response) => {
        setfatchAllApply(response.data)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {fatchAllApply.map((item) => {
      return (<div key={Math.random()} className='Jobs'>
        <div style={{ width: '95%', display: 'flex', flexDirection: 'row', gap: '3px', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
          <div style={{ margin: '15px 0px' }}>
            <span style={{ fontSize: '23px', fontWeight: 'bolder' }}>Name: {item.name}</span>
            <p style={{ fontWeight: 'normal' }}>Number: {item.number}</p>
            <p style={{ fontSize: '14px', color: 'gray' }}>Email: {item.email}</p>
            <p style={{ fontSize: '14px', color: 'gray' }}>Education: {item.education}</p>
          </div>
          <div>
          </div>
        </div>
        <span style={{ fontWeight: 'bold', marginRight: '20px' }} onClick={() => handleDelete(item._id)}>Delete</span>
      </div>)
    })}

  </div>
  )
}

export default ApplyUser