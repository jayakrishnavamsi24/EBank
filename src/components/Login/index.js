import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  onUerIdChange = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onPinChange = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-inner-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="image"
            />
          </div>
          <form className="form-element" onSubmit={this.onFormSubmit}>
            <h1 className="login-title"> Welcome Back! </h1>
            <div className="input-container">
              <label htmlFor="user" className="label">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="input"
                type="text"
                value={userId}
                onChange={this.onUerIdChange}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                placeholder="Enter PIN"
                id="pin"
                className="input"
                type="password"
                value={pin}
                onChange={this.onPinChange}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="error-container">
              {showError === true && <p className="error-text"> {errorMsg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
