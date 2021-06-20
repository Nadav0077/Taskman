import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove, add, query } from '../store/actions/boardsAction.js';
import { MiniBoard } from '../cmps/board/MiniBoard'
import { utilService } from '../services/generalService/utilService.js'
class _BoardList extends Component {
    state = {
        newBoard: {
            title: '',
            backgroundId: 0,
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
        filterByTitle: ''
        }
    }
    componentDidMount() {
        this.props.query('')
    }

    onSetFilter = (filterByTitle) => {
        this.props.query(filterByTitle)
    }
    onCreateBoard = async () => {
        const { title, backgrounds, backgroundId } = this.state.newBoard
        this.props.add(title, backgrounds[backgroundId])
        this.props.query()
    }
    changeImg = (num) => {
        const { backgroundId, backgrounds } = this.state.newBoard
        if (backgroundId + num === backgrounds.length || backgroundId + num === -1) num = 0
        this.setState(prevState => ({
            newBoard: {
                ...prevState.newBoard,
                backgroundId: backgroundId + num,
            }
        }))
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({
            newBoard: {
                ...prevState.newBoard,
                [field]: value,
            }
        }))
    }

    handleChangeFilter = (ev) => {
        const value =  ev.target.value
        this.setState({filterByTitle:value}, () => {
            const {filterByTitle} = this.state
            this.onSetFilter(filterByTitle)
        })
    }
    render() {
        const { boards } = this.props
        if(!boards) return <div>loading...</div>
        return (
            <section className=" w-100 flex column center content-center pad-3">
                <h1 className="fam-1 fs30 mb-2">Choose Your Board...</h1>
                <input type="text" onChange={this.handleChangeFilter} className="board-filter" placeholder="Search board..." />
                <div className="boards-gallery flex h-40 w-100 gap-3 wrap">
                    <section className={"miniBoard flex center content-center"} style={{ backgroundImage: "url(" + this.state.newBoard.backgrounds[this.state.newBoard.backgroundId] + ")" }}>
                        <form className="add-board" onSubmit={(ev) => {
                            ev.preventDefault()
                            this.onCreateBoard()
                        }}>
                            <input type="text" name="title" autoComplete="off" onChange={this.handleChange} placeholder="Board title..." />
                            <div className="change-img-container flex space-between control-img">
                                <span className="change-img" onClick={() => { this.changeImg(-1) }}>{'<'}</span>
                                <button>Create board</button>
                                <span className="change-img" onClick={() => { this.changeImg(1) }}>{'>'}</span>
                            </div>
                        </form>
                    </section>
                    {boards && boards.map(board => {
                        if (board.isFavorite)
                        return <Link key={board._id} to={`board/${board._id}`}><MiniBoard board={board} /></Link>
                    })}
                    {boards && boards.map(board => {
                        if (!board.isFavorite)
                        return <Link key={board._id} to={`board/${board._id}`}><MiniBoard board={board} /></Link>
                    })}
                    {!boards && <h1 >No boards to show</h1>}
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    remove,
    add,
    query
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)