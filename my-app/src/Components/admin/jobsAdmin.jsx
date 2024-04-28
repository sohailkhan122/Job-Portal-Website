import axios from 'axios';
import React from 'react'

const JobsAdmin = ({ data, setfilterdata }) => {

    const disabledData = async (id) => {
        try {
            const response = await axios.put(`https://job-portal-website-x40p.onrender.com/disabled/${id}`, { disabled: true });
            console.log(response)
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await axios.get("https://job-portal-website-x40p.onrender.com/fatchAllJobs");
            console.log("Data fetched:", response.data);

            const filteredData = response.data.filter((item) => item.disabled === false);
            console.log("Filtered data:", filteredData);

            setfilterdata(filteredData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className='Jobs'>
            <div style={{ width: '95%', display: 'flex', flexDirection: 'row', gap: '3px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ margin: '15px 0px' }}>
                    <span style={{ fontSize: '23px', fontWeight: 'bolder' }}>{data.jobtittle}</span>
                    <p style={{ fontWeight: 'normal' }}>Company: {data.company}</p>
                    <p style={{ fontSize: '14px', color: 'gray' }}>Address: {data.joblocation}</p>
                </div>
                <div>
                    <span style={{ fontWeight: 'bolder', cursor: 'pointer', color: 'red' }} onClick={() => disabledData(data._id)}>Disabled</span>
                </div>
            </div>
        </div>
    )
}

export default JobsAdmin