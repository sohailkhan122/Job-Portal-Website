import React from 'react'
import { useNavigate } from 'react-router-dom';

const Jobs = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className='Jobs'>
            <div style={{ width: '95%', display: 'flex', flexDirection: 'row', gap: '3px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ margin: '15px 0px' }}>
                    <span style={{ fontSize: '23px', fontWeight: 'bolder' }}>{data.jobtittle}</span>
                    <p style={{ fontWeight: 'normal' }}>Company: {data.company}</p>
                    <p style={{ fontSize: '14px', color: 'gray' }}>Address: {data.joblocation}</p>
                </div>
                <div>
                    <span style={{ fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => navigate(`/deatilPage/${data._id}`)}>View</span>
                </div>
            </div>
        </div>
    )
}

export default Jobs