import React, { Component } from 'react'
import { Upload } from '../cmps/Upload'
import ProfileImg from '../assets/img/profilePic.jpg'
import { userService } from '../services/userService.js'
import { connect } from 'react-redux'
import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _UserDetails extends Component {
  state = {
    user: null
  }
  doLogout = () => {
    this.props.logout()
    this.props.history.push('/')
    document.querySelector('.app-header').classList.remove('bg-header-board');
  }
  async componentDidMount() {
    const user = await userService.getById(this.props.match.params.userId)
    // const user = {
    //   _id: 'a123',
    //   username: 'NadavMgr',
    //   fullame: 'Nadav Magier',
    //   email: 'nadav1410@gmail.com',
    //   imgUrl: 'https://res.cloudinary.com/dorshaul/image/upload/v1617004425/ytav_twnglu.jpg',
    //   createdAt: '2021-03-29T07:54:21.000Z'
    // }
    this.setState({ user })
  }

  render() {
    if(!this.state.user) return <div>loading..</div>
    const { _id, username, fullname, email, imgUrl } = this.state.user
    const url = (imgUrl) ? imgUrl : ProfileImg
    return (
      <section className="user-details-container">
        <div className="user-details flex">
          <img src={url} />
          <div className="txt-user-details flex column fam-1">
            <span className="user-fullname">{fullname}</span>
            <span className="user-username">@{username}</span>
            <span className="user-email">{email}</span>
            {_id === this.props.loggedInUser._id && <button className="btn-logout" onClick={() => this.doLogout()}>Logout</button>}
          </div>
        </div>
        {/* <Upload /> */}

      </section>
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
export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)