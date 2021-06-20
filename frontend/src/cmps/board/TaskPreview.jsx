import { Link } from 'react-router-dom'
import { Draggable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import { boardService } from '../../services/boardService.js'
import { BsCheckBox } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
import { GrTextAlignFull } from 'react-icons/gr'
import { connect } from 'react-redux'
import { utilService } from '../../services/generalService/utilService'
import React, { Component } from 'react'
import { UserPreview } from './UserPreview.jsx';

import { toggleLabel } from '../../store/actions/systemAction.js';



// export function TaskPreview({ board, index, task, updateBoard, groupId }) {
class _TaskPreview extends Component {

    getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        const { moveTo, curve, duration } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.01turn)';

        // patching the existing style
        return {
            ...style,
            background: '#fff',
            transform: `${translate} ${rotate}`,
            // slowing down the drop because we can
            transition: `all ${curve} 0.2s`,
        };
    }

    onRemoveTask = (taskId) => {
        const { board, index, task, updateBoard, groupId } = this.props
        const group = board.groups[boardService.getGroupIdxById(board, groupId)]
        board.groups[boardService.getGroupIdxById(board, groupId)].tasks.splice(boardService.getTaskIdxById(group, taskId), 1)
        updateBoard({ ...board })
    }

    dueDateDonePreview = (task) => {
        if(task.isDone) return 'done-preview'
        else return ''
     }
    render() {
        const { board, index, task, group, groupId } = this.props
        const isLabelOpen = this.props.isLabelOpen;
        return <Draggable
            draggableId={task.id}
            index={index}
        // isDragDisabled={false}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging && !snapshot.isDropAnimating ? 'true' : 'false'}
                        style={this.getStyle(provided.draggableProps.style, snapshot)}
                    >
                        <div className="wrap-list-task br-3">
                            <div className="wrap-task-prev">
                            {task.imgUrl && <img className="preview-img" src={task.imgUrl}/> }
                                <div className="task-preview flex column">
                                    {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                                    <span className="cur-pointer fam-1 font-s bold flex d-none " onClick={() => { this.onRemoveTask(task.id) }}><AiOutlineClose className="preview-icon" /></span>
                                    {utilService.isFalse(task.labelIds) &&
                                                <div className="labels-container flex  wrap" onClick={(ev) => {
                                                    ev.stopPropagation();
                                                }}>
                                                    {
                                                        task.labelIds.map(labelId => {
                                                            const label = board.labels.find(label => {
                                                                return label.id === labelId;
                                                            })

                                                            if (label) {
                                                                return <div
                                                                    key={label.id}
                                                                    className={`preview-label flex  ${isLabelOpen && "label-open"}`}
                                                                    onClick={() => this.props.toggleLabel(!isLabelOpen)}
                                                                    style={{ backgroundColor: label.color }}
                                                                >
                                                                    {this.props.isLabelOpen && label.title}
                                                                </div>
                                                            }
                                                        })}

                                        </div>
                                    }

                                    <Link to={`/board/${board._id}/${groupId}/${task.id}`}>


                                        <h1 style={{color:group.color?group.color:'#172b4d'}} className="task-title fam-1 font-m">{task.title}</h1>
                                        <div className="task-mini-details flex row-reverse w-100 space-between gap-xs fam-1 c-stand center">
                                            <div>
                                            {utilService.isFalse(task.members) && <small className="flex center">{task.members.map(member => { return <UserPreview key={member._id} user={member} /> }).splice(0, 3)}</small>}
                                            </div>
                                            <div className="flex">
                                            {utilService.isFalse(task.comments) && <small className="flex center"><FaRegCommentDots className="preview-icon" /></small>}
                                            {utilService.isFalse(task.checklists) && <div className={`preview-icon flex row center ${boardService.checklistPreview(task).isDone && "done-preview"}`}>
                                                <BsCheckBox className="preview-icon" />
                                                <small>{boardService.checklistPreview(task).str}</small>
                                            </div>}
                                            {task.dueDate && <div className={`preview-icon flex row center ${this.dueDateDonePreview(task)}`}>
                                                <AiOutlineClockCircle className="preview-icon" />
                                                <small>
                                                    { utilService.getFormattedDate(task.dueDate) }
                                                </small>
                                            </div>}
                                            {task.description && <small className="flex center"><GrTextAlignFull className="preview-icon" /></small>}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            }
        </Draggable>
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        isLabelOpen : state.systemModule.isLabelsOpen
    }
}
const mapDispatchToProps = {
    toggleLabel
}
export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(_TaskPreview)