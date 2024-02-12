import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { LogoutOutlined } from '@ant-design/icons'
import { FolderAddOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const myProfile = () => {
    navigate('/userProfile')
  }

  const createJob = () => {
    navigate('/createjob')
  }

  const logOut = () => {
   localStorage.clear()
   navigate('/login')
  }
  return (
    <div className='HeaderMainContainer'>
      <div className='ProfileContainer'>
        <span><UserOutlined /></span>
        <span style={{ fontWeight: 'bolder' }} onClick={(myProfile)}>My Profile</span>
      </div>
      <div className='JobsLogOutContainer'>
        <div className='jobsContainer'>
          <img src="https://cdn.vectorstock.com/i/1000x1000/61/72/briefcase-icon-black-businessman-bag-office-job-vector-45006172.webp" alt="job" width={'16px'} height={'16px'} />
          <span style={{ fontWeight: 'bolder' }} onClick={() => navigate('/')}>Jobs</span>
        </div>
        <div className='LogOutConatainer'>
          <FolderAddOutlined />
          <span style={{ fontWeight: 'bolder' }} onClick={createJob}>Create Job</span>
        </div>
        <div className='LogOutConatainer'>
          <LogoutOutlined />
          <span style={{ fontWeight: 'bolder' }} onClick={logOut}>Log Out</span>
        </div>
      </div>
    </div>
  )
}

export default Header