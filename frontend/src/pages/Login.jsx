import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload } from '../cmps/Upload'
import LoginPic from '../assets/img/login.svg'
import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    },
    toggleLogin: true
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  toggleLogin = () => {
    this.setState({ ...this.state, toggleLogin: !this.state.toggleLogin })
  }
  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    try {
      this.props.login({ username: this.state.loginCred.username, password: this.state.loginCred.password })
      document.querySelector('.app-header').classList.add('bg-header-board');
      this.props.history.push('/board')

      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }

  doLogout = () => {
    this.props.logout()
    this.props.history.push('/')
    document.querySelector('.app-header').classList.remove('bg-header-board');
  }
  render() {
    let signupSection = (
      <form className="flex column sign-up space-between" onSubmit={this.doSignup}>
        <h2 className="fam-1 font-3 fw-2">Signup</h2>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <br />
        <Upload />
        <div className="flex space-between">
          <button className="sign-btn">Signup</button>
          <button className="login-btn" onClick={() => this.toggleLogin()}>Login</button>
        </div>
      </form>
    )
    let loginSection = (
      <form className="login flex column  w-100 h-80 space-between" onSubmit={this.doLogin}>
        <h2 className="fam-1 font-3 fw-2 mb-1">Login</h2>

        <select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users && this.props.users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        </select>
        

        {/* <input
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br /> */}
        <div className="flex space-between mt-3">
          <button className="login-btn">Login</button>
          <button className="login-btn" onClick={() => this.toggleLogin()}>Sign-in</button>
        </div>

      </form>
    )

    const { loggedInUser } = this.props
    const toggleLogin = this.state.toggleLogin;
    return (
      <div className="login-sign-up flex column right content-center">
        {/* <p>{this.state.msg}</p> */}

        {loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.fullname}
              <button onClick={() => { this.doLogout() }}>Logout</button>
            </h3>
          </div>
        )}

        {(!loggedInUser && toggleLogin) && loginSection}
        {(!loggedInUser && !toggleLogin) && signupSection}
          {/* <LoginPic/> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
