import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AllJobs from './AllJobs';

const Welcome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate("/")
    }
     // eslint-disable-next-line
  }, [navigate])
  return (
    <div className='WelcomeContainer'>
      <Header />
      <AllJobs />
    </div>
  )
}

export default Welcome