import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-bottom-section">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="atm-card"
        />
      </div>
    </div>
  )
}

export default Home
