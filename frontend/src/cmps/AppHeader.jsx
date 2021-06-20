import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserPreview } from '../cmps/board/UserPreview'
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'
import { IoIosNotificationsOutline, IoAppsSharp } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { VscAdd, VscHome } from 'react-icons/vsc'
import { MdApps } from 'react-icons/md'
import { FiAlertCircle } from 'react-icons/fi'



class _AppHeader extends Component {
    state = {
        loggedInUser: null,
        loginPage: false,
        search: ''
    }

    componentDidMount() {
        this.setState({
            loggedInUser: this.props.loggedInUser
        })
        if (this.props.loggedInUser) {
            document.querySelector('.app-header').classList.remove('home-menu')
            document.querySelector('.btn-login').classList.remove('btn-login')
        } else {
            document.querySelector('.app-header').classList.add('home-menu')
            document.querySelector('.btn-login').classList.add('btn-login')
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedInUser !== prevProps.loggedInUser) {
            this.setState({
                loggedInUser: this.props.loggedInUser
            });
            if (this.props.loggedInUser) {
                document.querySelector('.app-header').classList.remove('row')
            } else {
                document.querySelector('.app-header').classList.add('row-reverse')
            }
        }
    }

    onChangeBoardName = () => {
        // const board = this.props.board
        // board.title = this.state.title
        // this.props.updateBoard(board)
        console.log('do search');
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    toggleLoginPage() {
        this.setState({
            ...this.state, loginPage: !this.state.loginPage
        })
    }
    render() {
        // const { loggedInUser } = this.props;
        let className = "app-header flex space-between center fam-1 font-s c-white signin";
        const { loggedInUser, loginPage } = this.state;

        return <header className={className}>
            {loggedInUser && (
                <nav className="main-nav flex center space-between w-57">
                    <ul className="flex center">

                        <NavLink to="/" className="icon-header bg-btn">
                            <MdApps className="add-icon-nav" /></NavLink>

                        <NavLink to="/boards" className="icon-header bg-btn">
                            <VscHome className="add-icon-nav" /></NavLink>


                        <NavLink to="/board" className="btn-boards boards-list-btn  flex center bg-btn">
                            <span className="icon-boards bold">
                                <RiCheckboxMultipleBlankLine />
                            </span>
                            <span className="">Boards</span>
                        </NavLink>
                        <li className="flex center search-input-box bg-btn ">
                            <div onClick={(ev) => {
                                ev.preventDefault()
                                this.onChangeBoardName(ev)
                            }} className="jump-to flex center">
                                <input type="text"
                                    className="app-input  font-m lh-20 c-white search-input-text fam-1 "
                                    name="search"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    value={this.state.title}
                                    onBlur={this.onChangeBoardName}
                                    placeholder={`Jump to...`}
                                />
                                <span className="icon-search flex center content-end"><AiOutlineSearch /></span>
                            </div>
                        </li>
                    </ul>
                    <div className="logo font-5">
                        <Link to={`/`} className="app-header-logo">
                            <span className="logo-span">T</span>askman
                </Link>
                    </div>
                </nav>
            )}


            <nav className="main-nav flex space-evenly">
                {loggedInUser && (
                    <nav className="main-nav flex center space-evenly">
                        <NavLink to="/board" className="icon-header bg-btn">
                            <span className="small-icon flex center">
                                <VscAdd/>
                            </span>
                        </NavLink>
                        <NavLink to="/login" className="icon-header bg-btn" >
                            <span className="small-icon flex center">
                                <FiAlertCircle />
                            </span>
                        </NavLink>
                        <NavLink to="/login" className="icon-header bg-btn bg-danger" >
                            <span className="small-icon alert-icon flex center">
                                <IoIosNotificationsOutline />
                            </span>
                        </NavLink>

                    </nav>
                )}
                {loggedInUser && (<NavLink to={`/user/${loggedInUser._id}`} className="btn-board"><UserPreview user={loggedInUser} /></NavLink>)}

                {(!loggedInUser && !loginPage) && (
                    <div className="home-menu" onClick={() => { this.toggleLoginPage() }}>
                        <NavLink to="/login" className="btn-login">Login</NavLink>
                    </div>
                )}
                {(!loggedInUser && loginPage) && (
                    <div className="home-menu" onClick={() => { this.toggleLoginPage() }}>
                        <NavLink to="/" className="btn-login">Home</NavLink>
                    </div>
                )}
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {

}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)