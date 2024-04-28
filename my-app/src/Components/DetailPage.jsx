import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
const DetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    const [data, setData] = useState({});
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false); // Add loading state for edit button
    const [deleteLoading, setDeleteLoading] = useState(false); // Add loading state for delete button

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/singleJobs/${id}`);
                setData(response.data);
                if (response.data.createdBy === user.id._id) {
                    setOwner(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user.id._id]);

    const handleDelete = async () => {
        try {
            setDeleteLoading(true); // Set delete button loading state to true
            await axios.delete(`http://localhost:8000/singledelete/${data._id}`);
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteLoading(false); // Reset delete button loading state
        }
    }

    const handleEdit = async () => {
        try {
            setEditLoading(true); // Set edit button loading state to true
            navigate(`/jobEdit/${data._id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setEditLoading(false); // Reset edit button loading state
        }
    }

    return (
        <div className='MainMyProfileContainer'>
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
                                        <Button onClick={handleEdit} loading={editLoading}>Edit</Button>
                                        <Button onClick={handleDelete} loading={deleteLoading}>Delete</Button>
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
            )}
        </div>
    );
}





//             <div className='MyProfileContainer'>
//                 <div className='MyProfile' >
//                     <img src="/Image/user-3296.png" alt="gg" width={'250px'} />
//                     <div>
//                         <h1 style={{ marginLeft: '20px' }}>Company: {data.company}</h1>
//                         <h4 style={{ color: 'gray', marginLeft: '20px' }}>Job Tittle: {data.jobtittle}</h4>
//                         <div style={{ marginLeft: '20px', display: 'flex', gap: '10px', marginTop: '20px' }}>

//                             {
//                                 !owner && (

//                                     <Button onClick={() => navigate(`/applyForm/${data._id}`)}>Apply</Button>
//                                 )
//                             }

//                             {owner && (
//                                 <div style={{ display: 'flex', gap: '10px' }}>
//                                     <Button onClick={() => navigate(`/jobEdit/${data._id}`)}>Edit</Button>
//                                     <Button onClick={handleDelete}>Delete</Button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='Deatils'>
//                     <h4>Job Location: {data.joblocation}</h4>
//                     <h4>Work Place Type: {data.workplacetype}</h4>
//                     <h4>Job Type: {data.jobtype}</h4>
//                 </div>
//                 <div className='aboutinfo'>
//                     <h1>About Info</h1>
//                     <p style={{ fontWeight: '400', paddingTop: '10px' }}>{data.aboutInfo}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default DetailPage