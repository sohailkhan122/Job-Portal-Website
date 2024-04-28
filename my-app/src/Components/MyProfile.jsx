import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'
import { TailSpin } from 'react-loader-spinner';

const MyProfile = () => {
  const [fatchAllJob, setFatchAllJob] = useState([])
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add state for error handling
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    axios.get(
      "http://localhost:8000/fatchAllJobs",
    ).then((response) => {
      setFatchAllJob(response.data)
    }).catch((error) => {
      console.log(error)
      setError(error); // Set error state if there's an error fetching data
    }).finally(() => {
      setLoading(false); // Set loading state to false when fetching is done
    });
  }, [])

  const filteredJobs = fatchAllJob.filter((data) => {
    return data.createdBy === user.id._id;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TailSpin
          visible={true}
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Render error message if there's an error
  }

  return (
    <>
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
        {filteredJobs.length === 0 ? null :
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
          </div>}
      </div>
    </>
  )
}

export default MyProfile
