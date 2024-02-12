import axios from 'axios'
import React, { useEffect, useState } from 'react'
import JobsAdmin from './jobsAdmin'

const AdminJobs = () => {
    const [filterdata, setfilterdata] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("Fetching data...");
            const response = await axios.get("http://localhost:8000/fatchAllJobs");
      
            const filteredData = response.data.filter((item) => !item.disabled);
            
            setfilterdata(filteredData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);
      

    return (
        <div className='AllJobs adminAlljobs'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {filterdata.map((data) => {
                    return <JobsAdmin key={Math.random()} setfilterdata={setfilterdata} data={data} />
                })}
            </div>
        </div>
    )
}

export default AdminJobs