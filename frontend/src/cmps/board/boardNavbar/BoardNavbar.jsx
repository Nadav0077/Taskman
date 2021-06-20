import { MembersBoard } from '../MembersBoard';
import { add, loadBoard, update, setBoard, remove } from '../../../store/actions/boardsAction.js';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Component } from 'react';
import { BoardMembersModal } from './BoardMembersModal'
// import { InfoBoardModal } from './InfoBoardModal'
import { BsCalendar } from 'react-icons/bs'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { connect } from 'react-redux'
import { utilService } from '../../../services/generalService/utilService.js';
import { UserPreview } from '../UserPreview.jsx';



class _BoardNavbar extends Component {
    state = {
        displayBoard: this.props.displayBoard,
        title: this.props.board.title,
        members: this.props.board.members,
        backgrounds: ['',
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2286x1600/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671389/backrounds/0_jflqwf.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671416/backrounds/1_gavwov.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991464/backrounds/images_nnscac.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991434/backrounds/ded84385480090c3464352f152dbc0c8_bzdu9x.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991432/backrounds/508751_bftz6u.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991426/backrounds/wp4676582_rhnghy.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991421/backrounds/Eb3zqm9WsAIalyT_sdypqq.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991411/backrounds/wallpapersden.com_cool-4k-pattern_3840x2160_ag3xac.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991393/backrounds/wp5633980_gb2sub.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991348/backrounds/65c7d4a8f34de11f9414ce49b847e56a_bvwpgt.gif',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991338/backrounds/Vaporwave-4K-Wallpapers_mmacwb.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622991315/backrounds/thor-stormbreaker-minimalist-wallpaper_goxnts.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671401/backrounds/2_gstip0.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671404/backrounds/4_ly2zj7.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671430/backrounds/6_mi6wun.jpg',
            'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671421/backrounds/7_oivv0t.jpg',
        ],
        isActivities: true
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            displayBoard: this.props.displayBoard,
            title: this.props.board.title,
            members: this.props.board.members
        })
    }


    onAddMemberToBoard = (addedMember) => {
        const { members } = this.state
        const memberIdx = members.findIndex(member => member._id === addedMember._id)
        if (memberIdx !== -1) {
            members.splice(memberIdx, 1)
        }
        else members.push(addedMember)
        const copyBoard = { ...this.props.board }
        copyBoard.members = members
        console.log(members)
        this.props.updateBoard(copyBoard)
    }

    isMemberChecked = (memberCheck) => {
        const memberIdx = this.state.members.findIndex(member => member._id === memberCheck._id)
        if (memberIdx !== -1) {
            return 'checked'
        }
        else return ''
    }

    toggleActivities = () => {
        this.setState({ isActivities: !this.state.isActivities })
    }

    toggleModal = (className) => {
        const modals = document.querySelectorAll('.action-modal');
        const currModal = document.querySelector(`.${className}`);
        if (modals) {
            modals.forEach(
                el => el.classList.add('d-none'));
        }
        if (currModal) {
            currModal.classList.remove('d-none');
        }
    }
    onChangeBoardName = () => {
        const board = this.props.board
        board.title = this.state.title
        this.props.updateBoard(board)
    }

    onChangeBg = (url) => {
        const board = this.props.board
        board.style = url
        document.body.style.background = board.style ? `url(${board.style})` : 'rgb(0, 121, 191)'
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        this.props.updateBoard(board)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    render() {
        const { board, onUpdate } = this.props;
        console.log(this.props);
        const displayBoard = this.props.displayBoard
        if (!board) return <div>Loading...</div>
        return (
            <nav className="board-navbar flex space-between font-m c-white fam-1 ">
                <ul className="left-bar flex center space-evenly ">
                    <ul className="display-option">
                        {displayBoard === 'board' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner"
                                    onClick={() => { this.props.changeDisplay('dashboard') }}>
                                    <span className="ps-xxs flex center">< BiBarChartAlt2 /></span>
                                Dashboard
                                </li>
                            </div>
                        }

                        {displayBoard === 'dashboard' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner"
                                    onClick={() => { this.props.changeDisplay('board') }}>
                                    <span className="ps-xxs flex center"><RiDashboardLine /></span>
                                    Board
                                </li>
                            </div>
                        }

                        {/* {displayBoard === 'calendar' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner" onClick={() => { this.toggleModal('info-board-wrap-modal') }}>
                                    <span className="ps-xxs flex center"><BsCalendar /></span>
                                    Calendar
                                    <span className="font-2 flex right">
                                        <MdKeyboardArrowDown />
                                    </span>
                                </li>
                                <InfoBoardModal
                                    toggleModal={() => { this.toggleModal() }}
                                    changeDisplay={this.props.changeDisplay}
                                />
                            </div>
                        } */}

                    </ul>

                    <li className="btn-board bold ps-xxs">
                        <div onClick={(ev) => {
                            ev.preventDefault()
                            this.onChangeBoardName(ev)
                        }}>
                            <input type="text"
                                className="app-input bold font-m lh-20 c-white title-nav-input "
                                name="title"
                                onChange={this.handleChange}
                                autoComplete="off"
                                value={this.state.title}
                                onBlur={this.onChangeBoardName}
                                minLength={2}
                                maxLength={13}
                            />
                        </div>
                    </li>
                    <li className="btn-board btn-board-navbar bg-board-btn" onClick={this.props.favBoard}>
                        {!board.isFavorite && <AiOutlineStar />}
                        {board.isFavorite && <AiFillStar />}
                    </li>
                    <span className="board-btn-divider"></span>
                    <li className="btn-board btn-board-navbar bg-board-btn">Visiblity</li>
                    <span className="board-btn-divider"></span>
                    <li className="btn-board bg-inherit" ><MembersBoard /></li>
                    <ul className="members-wrap ">
                        <li
                            className="btn-board btn-board-navbar bg-board-btn"
                            onClick={() => { this.toggleModal('board-members-wrap-modal') }}>
                            Invite
                        </li>
                        <BoardMembersModal
                            users={this.props.users}
                            isMemberChecked={this.isMemberChecked}
                            onAddMemberToBoard={this.onAddMemberToBoard}
                            toggleModal={() => { this.toggleModal() }}
                        />
                    </ul>
                </ul>
                <ul className="right-bar flex center">
                    <li className="btn-board btn-board-navbar bg-board-btn btn-nav-delete" onClick={() => this.props.removeBoard()}>Delete Board</li>
                    <li onClick={() => { this.props.onToggleActivities() }} className="btn-board btn-board-navbar bg-board-btn ">...
                    </li>
                    <div className="board-menu flex column">
                        <div className="header-side-bar flex mb-06 space-between">
                            <h1 className="center-self menu-header">Menu</h1>
                            <div className="menu-header menu-btn  mb-06 flex center content-center" onClick={this.toggleActivities}>{this.state.isActivities ? 'Backgrounds' : 'Activities'}</div>
                        </div>

                        <ul className="active-list">
                            {
                                this.state.isActivities && board.activities && board.activities.map(activity => {
                                    if (!activity) return
                                    return <li key={activity.id} className="full-activty flex column w-100">
                                        <div className="flex baseline w-100 mb-03">
                                            <div className="flex center w-100 space-between">
                                                <div className="w-100 flex center">
                                                    <UserPreview user={activity.byMember} />
                                                    <div className="commenter-name ps-xs c-info bold">{activity.byMember.fullname}</div>
                                                </div>
                                                <small className="w-20 t-decor">{utilService.timeAgo(activity.createdAt)}</small>
                                            </div>
                                        </div>
                                        <div className="comment-gap">
                                            <p className="comment-txt ">{activity.txt}</p>
                                        </div>
                                    </li>

                                })

                            }
                        </ul>
                        <div className="bg-list-wrap">
                            <ul className="board-bg-list flex column align-center gap-1">
                                {
                                    !this.state.isActivities && this.state.backgrounds.map((background) => {
                                        return <li onClick={() => { this.onChangeBg(background) }} className={"miniBoard cur-pointer flex center content-center"} style={{ backgroundImage: "url(" + background + ")" }}>

                                        </li>
                                    })
                                }</ul>
                        </div>
                    </div>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser,

    }
}

const mapDispatchToProps = {
    remove,
    add,
    loadBoard,
    update,
    setBoard
}

export const BoardNavbar = connect(mapStateToProps, mapDispatchToProps)(_BoardNavbar)