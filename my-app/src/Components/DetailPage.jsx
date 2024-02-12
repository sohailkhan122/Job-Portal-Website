import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
const DetailPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setdata] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const [owner, setowner] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/singleJobs/${id}`);
                setdata(response.data);
                if (response.data.createdBy === user.id._id) {
                    setowner(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, user.id._id]);


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/singledelete/${data._id}`);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }


    // const alreadyApplyUsers = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/fatchAllApply');
    //         if (response) {
    //             const isAlreadyApplied = response.data.some(item => item.jobId === id);
    //             console.log(isAlreadyApplied)
    //             setalreadyApply(false);
    //         } else {
    //             setalreadyApply(false);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // useEffect(()=>{
    //     alreadyApplyUsers();
    // })




    return (
        <div className='MainMyProfileContainer'>
            <div className='MyProfileContainer'>
                <div className='MyProfile' >
                    <img src="/Image/user-3296.png" alt="gg" width={'250px'} />
                    <div>
                        <h1 style={{ marginLeft: '20px' }}>Company: {data.company}</h1>
                        <h4 style={{ color: 'gray', marginLeft: '20px' }}>Job Tittle: {data.jobtittle}</h4>
                        <div style={{ marginLeft: '20px', display: 'flex', gap: '10px', marginTop: '20px' }}>

                            {
                                !owner && (

                                    <Button onClick={() => navigate(`/applyForm/${data._id}`)}>Apply</Button>
                                )
                            }

                            {owner && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={() => navigate(`/jobEdit/${data._id}`)}>Edit</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='Deatils'>
                    <h4>Job Location: {data.joblocation}</h4>
                    <h4>Work Place Type: {data.workplacetype}</h4>
                    <h4>Job Type: {data.jobtype}</h4>
                </div>
                <div className='aboutinfo'>
                    <h1>About Info</h1>
                    <p style={{ fontWeight: '400', paddingTop: '10px' }}>{data.aboutInfo}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailPage