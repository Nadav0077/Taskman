import { connect } from 'react-redux'
import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';
import { loading } from '../store/actions/systemAction';
import { loadUsers } from '../store/actions/userActions.js'
import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'
import { BoardNavbar } from '../cmps/board/boardNavbar/BoardNavbar'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Route, Switch } from 'react-router';
import { TaskDetails } from '../cmps/board/taskDetails/TaskDetails';
import { boardService } from '.././services/boardService.js'
import { utilService } from '../services/generalService/utilService.js'
import { socketService } from '../services/generalService/socketService.js'
import { ModalWrapper } from '../cmps/shared/ModalWrapper.jsx';
import { Dashboard } from './Dashboard';
import { Calendar } from './calendar';

const EMPTY_GROUP = { title: '' }

class _Board extends Component {
    state = {
        group: EMPTY_GROUP,
        displayBoard: 'board'
    }

    onToggleActivities = () => {
        document.body.classList.toggle('activities-open');
    }

    async componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
        this.props.loadUsers();
        socketService.setup()
        socketService.on('updated board', (board) => {
            if (boardId !== board._id) return
            this.props.setBoard(board)
        })
        socketService.emit('add member', boardId)
        this.removeClassName();
        const board = await boardService.getById(boardId)
        document.body.style.background = board.style ? `url(${board.style})` : 'rgb(0, 121, 191)'
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.querySelector('.app-header').style.backgroundColor = `rgba(0, 0, 0, 0.15)`;
    }

    componentWillUnmount() {
        socketService.off('updated board', this.props.setBoard)
        socketService.terminate()
        document.body.style.backgroundImage = `linear-gradient(to bottom right,#f0e3fc,#dff2fe,#daf5f7,#e0f6ea,#eef4e0)`
        document.querySelector('.app-header').style.backgroundColor = `#026AA7`
    }

    favBoard = () => {
        let board = { ...this.props.board }
        board.isFavorite = board.isFavorite ? false : true;
        this.props.update(board)
    }


    onUpdate = (updateBoard) => {
        this.props.update(updateBoard)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            group: {
                ...prevState.group,
                [field]: value,
            }
        }))
    }

    removeBoard = () => {
        this.props.remove(this.props.board._id)
        this.props.history.push('/board')
    }


    removeClassName() {
        if (document.querySelector('.board')) {
            document.querySelector('.board').classList.remove('max-screen');
        }
    };

    onAddGroup = () => {
        const copyBoard = { ...this.props.board };
        this.setState({ group: { ...this.state.group, id: utilService.makeId() } })
        copyBoard.groups.push(utilService.formatNewGroup(this.state.group))
        this.props.update(copyBoard)
        this.setState({ group: EMPTY_GROUP })
    }

    onDragEnd = res => {
        const { destination, source, type } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        const copyBoard = JSON.parse(JSON.stringify(this.props.board))
        const activity = {}
        if (type === 'task') {
            const sourceListIdx = boardService.getGroupIdxById(copyBoard, source.droppableId)
            const destinationListIdx = boardService.getGroupIdxById(copyBoard, destination.droppableId)
            const task = copyBoard.groups[sourceListIdx].tasks.splice(source.index, 1)
            copyBoard.groups[destinationListIdx].tasks.splice(destination.index, 0, task[0])
            const sourceListName = copyBoard.groups[sourceListIdx].title
            const destinationListName = copyBoard.groups[destinationListIdx].title
            activity.txt = `has moved ${task[0].title} from ${sourceListName} to ${destinationListName}`
        }
        else {
            const list = copyBoard.groups.splice(source.index, 1)
            copyBoard.groups.splice(destination.index, 0, list[0])
            activity.txt = `has moved list ${list[0].title}`
        }
        this.props.update(copyBoard)
        console.log('Moved and updated!', copyBoard)
    }

    onCloseDetails = () => {
        this.props.history.push(`/board/${this.props.board._id}`)

    }

    changeDisplay = (changeDisplay) => {
        this.setState({ ...this.state, displayBoard: changeDisplay })
    }
    render() {
        const { board } = this.props;
        if (!board) {
            return <div className="loader w-100 h-100 flex center content-center">Loading...</div>
        }
        // loading ui
        // this.props.loading();
        // if(this.props.isLoading) return <h1 className="w-100 h-100 flex center content-center">Loading...</h1>
        if (this.props.isLoading) return <div className="loader w-100 h-100 flex left content-center">Loading...</div>
        const displayBoard = this.state.displayBoard;
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <div
                    className="board flex column  animate__animated animate__fadeInRight ">
                    <div className="board-screen " onClick={this.onToggleActivities}></div>
                    <BoardNavbar
                        favBoard={this.favBoard}
                        removeBoard={this.removeBoard}
                        users={this.props.users}
                        board={board}
                        updateBoard={this.onUpdate}
                        changeDisplay={this.changeDisplay}
                        displayBoard={displayBoard}
                        onToggleActivities={this.onToggleActivities}
                    />
                    {displayBoard === 'board' && (
                        <div className="board-list flex w-100 "
                        >
                            <Droppable droppableId={board._id}
                                direction="horizontal"
                                type="group"
                            >
                                {provided => (
                                    <ul
                                        className="groups clean-list flex "
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {board && board.groups.map((group, idx) =>
                                            <TaskList
                                                index={idx}
                                                key={group.id}
                                                board={board}
                                                group={group}
                                                updateBoard={this.onUpdate}
                                            />)}
                                        {provided.placeholder}
                                    </ul>

                                )}
                            </Droppable>
                            <div className=" flex">
                                <form onSubmit={(ev) => {
                                    ev.preventDefault()
                                    this.onAddGroup()
                                }}>
                                    <input autoComplete="off" className="add-group" value={this.state.group.title} type="text" placeholder="+ Add another list" name="title" onChange={this.handleChange} />
                                </form>
                            </div>
                        </div>
                    )}
                    {displayBoard === 'dashboard' && <Dashboard />}
                    {displayBoard === 'calendar' && <Calendar />}


                    <Switch>
                        <Route
                            path={'/board/:boardId/:groupId/:taskId'}
                            render={(props) => <ModalWrapper onClick={this.onCloseDetails}>
                                <TaskDetails overlayHeight={538} {...props} />
                            </ModalWrapper>}>
                        </Route>
                    </Switch>
                </div>
            </DragDropContext>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        isLoading: state.systemModule.isLoading,
        users: state.userModule.users
    }
}
const mapDispatchToProps = {
    remove,
    add,
    loadBoard,
    update,
    loadUsers,
    setBoard
    // loading
}
export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)


