import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'
import axios from 'axios'

const AllJobs = () => {
  const [fatchAllJob, setFatchAllJob] = useState([])
  const [filterdata, setfilterdata] = useState([])
  useEffect(() => {
    axios.get(
      "http://localhost:8000/fatchAllJobs",
    ).then((response) => {
      // console.log(response.data)
      setFatchAllJob(response.data)
      const filteredData = response.data.filter((item) => !item.disabled);
      // console.log("Filtered data:", filteredData);

      setfilterdata(filteredData);
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div className='AllJobsContainer'>
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
    </div>
  )
}

export default AllJobs