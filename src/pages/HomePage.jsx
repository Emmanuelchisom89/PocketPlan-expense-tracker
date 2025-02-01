import React from 'react'
import LandingPage from '../components/landing/LandingPage'
import Header from '../components/header/Header'

const HomePage = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <Header />
      <main className='main'>
      <LandingPage />
      </main>
      <footer>
        <p>&copy; copyright {year}.</p>
      </footer>
    </div>
  )
}

export default HomePage
