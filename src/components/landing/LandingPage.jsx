import React from 'react'
import "./landingPage.css"
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <div className="hm_container">

            <div className="info">
                <h1>Pocket Planning <span className="navy">App</span></h1>

                <div className="info_p">
                <p>All-in-one solution for managing personal finances with ease and security, designed with intuitive
                   tools for tracking income, expenses, personal and business budgeting.</p>
                </div>

                <div className="info_btn">
                    <Link to="/signup"><button type="button" className="sign_up">Create Account</button></Link>
                    <Link to="/signin"><button type="button" className="sign_in">Sign in</button></Link>
                </div>
            </div>

            <div className="v_img">
                <img src="/PocketPlan-expense-tracker/7176685.jpg" alt=""/>
            </div>

        </div>
    </div>
  )
}

export default LandingPage
