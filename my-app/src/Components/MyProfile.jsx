import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'

const MyProfile = () => {
  const [fatchAllJob, setFatchAllJob] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    axios.get(
      "http://localhost:8000/fatchAllJobs",
    ).then((response) => {
      setFatchAllJob(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const filteredJobs = fatchAllJob.filter((data) => {
    return data.createdBy === user.id._id;
  });
  return (<>
    <div className='MainMyProfileContainer'>
      <div className='MyProfileContainer'>
        <div className='MyProfile' >
          <img src="/Image/user-3296.png" alt="gg" width={'250px'} />
          <div>
            <h1 style={{ marginLeft: '20px' }}>Name: {user.id.name}</h1>
            <h4 style={{ color: 'gray', marginLeft: '20px' }}>Email: {user.id.email}</h4>
          </div>
        </div>
      </div>
      <div className='MyJobContainer'>
        <div className='AllJobs'>
          <div style={{ paddingTop: '20px' }}>
            <span style={{ fontSize: '30px', fontWeight: 'bolder' }}>My Created Jobs</span>
            <p style={{ color: 'gray' }}>jobs</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', }}>

            {filteredJobs.map((data) => {
              return <Jobs key={Math.random()} data={data} />

            })}

          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default MyProfile