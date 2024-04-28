import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'

const AllJobs = () => {
  const [filterdata, setfilterdata] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(
      "https://job-portal-website-x40p.onrender.com/fatchAllJobs",
    ).then((response) => {
      const filteredData = response.data.filter((item) => !item.disabled);
      setfilterdata(filteredData);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }, [])

  return (
    <div className='AllJobsContainer'>
      {loading ? (
        <TailSpin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
