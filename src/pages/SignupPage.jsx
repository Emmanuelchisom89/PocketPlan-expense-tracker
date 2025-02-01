import React from 'react'
import DashHeader from '../components/header/DashHeader'
import Signup from '../components/auth/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  return (
    <div>
      <ToastContainer />
      <DashHeader />
      <div className="wrapper">
        <Signup />      
      </div>

    </div>
  )
}

export default SignupPage
