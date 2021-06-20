import { TaskPreview } from '../board/TaskPreview'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Component } from 'react';
import { boardService } from '../../services/boardService.js'
import { utilService } from '../../services/generalService/utilService.js'
import { GroupModal } from './taskDetails/action/actionModal/GroupModal'
const EMPTY_TASK = { title: '' }
const EMPTY_GROUP = { title: '' }

export class TaskList extends Component {
    state = {
        group: EMPTY_GROUP,
        task: EMPTY_TASK
    }
    componentDidMount() {
        this.setState({ group: this.props.group })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [field]: value,
            }
        }))
    }

    updateGroup = () => {
        if (!this.state.group.title) return;
        const copyBoard = { ...this.props.board };
        this.props.updateBoard(copyBoard)
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        copyBoard.groups[groupIdx] = this.state.group
        console.log(copyBoard)
    }

    handleChangeGroup = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            group: {
                ...prevState.group,
                [field]: value,
            }
        }))
    }

    onAddTask = () => {
        if (!this.state.task.title) return;
        const { group } = this.props
        const copyBoard = { ...this.props.board };
        const groupIdx = boardService.getGroupIdxById(copyBoard, group.id)
        copyBoard.groups[groupIdx].tasks.push(utilService.formatNewTask(this.state.task))
        console.log(this.state.task)
        this.setState({ task: EMPTY_TASK })
        this.props.updateBoard(copyBoard)
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

    render() {
        const { board, group, updateBoard, index } = this.props

        return (
            <Draggable index={index} draggableId={group.id} >
                {(provided, snapshot) => {
                    return <li className="group br-3"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <form className="" onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateGroup()

                        }}>
                            <div style={{ backgroundColor: group.color ? group.color : 'transparent' }} className="group-title w-100 flex center space-between pb-2">
                                <input
                                    autoComplete="off"
                                    className="app-input lh-20 "
                                    onBlur={this.updateGroup}
                                    type="text"
                                    value={this.state.group.title}
                                    name="title"
                                    onChange={this.handleChangeGroup}
                                />
                                <div className="group-menu" >
                                    <div className="btn" onMouseDown={(ev) => {
                                        if (ev.button == 0) {
                                            this.toggleModal(`g-${this.state.group.id}`)
                                        }
                                    }
                                    }
                                    >...</div>
                                    <GroupModal
                                        toggleModal={() => { this.toggleModal() }}
                                        group={group}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="wrap-task-list pad-001">

                            <div className="task-list flex column center ">
                                <Droppable
                                    droppableId={group.id}
                                    type='task'>
                                    {(provided) => (
                                        <div className="task-list-droppable"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {group.tasks.map((task, idx) => (
                                                <TaskPreview key={task.id}
                                                    board={board}
                                                    index={idx}
                                                    groupId={group.id}
                                                    updateBoard={updateBoard}
                                                    task={task}
                                                    group={group}
                                                />
                                            ))}
                                            {!utilService.isFalse(group.tasks) && <h1 className="task-title fam-1 font-m">No tasks to show</h1>}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <form onSubmit={(ev) => {
                                ev.preventDefault()
                                this.onAddTask()
                                console.log(ev)
                            }}>
                                <input autoComplete="off" className="add-task" value={this.state.task.title} type="text" placeholder="+ Add a card" name="title" onChange={this.handleChange} />
                            </form>
                        </div>
                    </li>
                }}
            </Draggable>)
        /*    </div> */
    }
}