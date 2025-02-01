import React from 'react'
import Signin from '../components/auth/Signin'
import DashHeader from '../components/header/DashHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const SigninPage = () => {
  return (
      <div>
        <ToastContainer />
        <DashHeader />
        <div className="wrapper">
            <Signin />
        </div>
    </div>
  )
}

export default SigninPage
