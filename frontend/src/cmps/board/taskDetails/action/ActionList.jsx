import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdLabelOutline } from 'react-icons/md'
import { AiOutlineClockCircle, AiOutlineCheckSquare, AiOutlineDelete } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { BsImage, BsArrowRight } from 'react-icons/bs'
import { LabelModal } from './actionModal/LabelModal';
import { MembersModal } from './actionModal/MembersModal'
import { DueDateModal } from './actionModal/DueDateModal'
import { MoveModal } from './actionModal/MoveModal'
import { CopyModal } from './actionModal/CopyModal'
import { withRouter } from "react-router";
import { Upload } from '../../../Upload';



class _ActionList extends Component {
    state = {
        task: null
    }

    componentDidMount() {

        this.setState({
            task: this.props.task
        })
    }

    componentDidUpdate(prevProps) {
    }

    closeDetails = () => {
        const boardId = this.props.match.params.boardId;
        this.props.history.push(`/board/${boardId}`)
    }
    render() {
        const { task } = this.state
        if (!task) return <h1>Loading...</h1>
        return (
            <div className="menu-task flex column w-50 content-start ps-1">
                <div className="details-action flex column w-100 ">
                    <label htmlFor="actions" className="font-m pb-3 ps-2 mb-1">ACTIONS</label>
                </div>
                <ul className="action-menu flex column w-100 clean-list font-m pad-0 fw-2">
                    <div className="line1">
                        <li className="label-wrap" onClick={() => this.props.openOverlay('label-wrap-modal')}>
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('label-wrap-modal') }}><MdLabelOutline />Labels</div>
                            <LabelModal toggleModal={() => { this.props.toggleModal() }} updateTaskLabel={this.props.updateTaskLabel}
                                task={task} />
                        </li>
                        <li className="members-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('members-wrap-modal') }}><FiUsers className="action-icon" />Members</div>
                            <MembersModal isMemberChecked={this.props.isMemberChecked} onAddMemberToTask={this.props.onAddMemberToTask} toggleModal={() => { this.props.toggleModal() }} />
                        </li>

                    </div>
                    <div className="line2">
                        <li className="duedate-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('duedate-wrap-modal') }}><AiOutlineClockCircle className="action-icon" />DueDate</div>
                            <DueDateModal onSaveDueDate={this.props.onSaveDueDate} toggleModal={() => { this.props.toggleModal() }} />
                        </li>

                        <li onClick={() => { this.props.onAddCheckList(task) }} className="btn-action"><AiOutlineCheckSquare className="action-icon" />Checklist</li>
                    </div>
                    <div className="line3">
                        <li onClick={(ev) => { ev.stopPropagation() }} className="no-modal-action"><Upload addImgToTask={this.props.addImgToTask} /></li>
                        <li className="move-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('move-wrap-modal') }}><BsArrowRight />Move</div>
                            <MoveModal group={this.props.group} task={task} toggleModal={() => { this.props.toggleModal() }} />
                        </li>
                    </div>
                    <div className="line4">
                        <li className="copy-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('copy-wrap-modal') }}><BiCopy className="action-icon" />Copy</div>
                            <CopyModal className="action-icon" group={this.props.group} task={task} toggleModal={() => { this.props.toggleModal() }} />
                        </li>
                        <li onClick={() => { this.props.onDeleteTask() }} className="btn-action btn-delete"><AiOutlineDelete className="action-icon" />Delete
                        </li>

                    </div>
                </ul>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {

}


export const ActionList = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActionList));
