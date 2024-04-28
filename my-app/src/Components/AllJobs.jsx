import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'

const AllJobs = () => {
  const [fatchAllJob, setFatchAllJob] = useState([])
  const [filterdata, setfilterdata] = useState([])
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get(
      "http://localhost:8000/fatchAllJobs",
    ).then((response) => {
      setFatchAllJob(response.data)
      const filteredData = response.data.filter((item) => !item.disabled);
      setfilterdata(filteredData);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false); // Update loading state when fetching is done
    });
  }, [])

  return (
    <div className='AllJobsContainer'>
      {loading ? (
     <TailSpin style={{display:'flex',justifyContent:'center',alignItems:'center'}}
              visible={true}
              height="100vh"
              width="100"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
   
      ) : (
        <div className='AllJobs'>
          <div>
            <span style={{ fontSize: '30px', fontWeight: 'bolder' }}>Still Hiring</span>
            <p style={{ color: 'gray' }}>Jobs you may have missed</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {filterdata.map((data) => {
              return <Jobs key={Math.random()} data={data} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllJobs
