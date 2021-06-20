import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { LabelTask } from '../LabelTask'
import { update } from '../../../../../store/actions/boardsAction';
import { boardService } from '../../../../../services/boardService'


class _MoveModal extends Component {
    state = {
        moveTo: null
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    
    // moveTask = () => {
    //     if (this.state.moveTo !== this.props.group.id) {
    //         const copyBoard = { ...this.props.board }
    //         copyBoard.groups[boardService.getGroupIdxById(copyBoard, this.props.group.id)].tasks.splice(
    //             boardService.getTaskIdxById(this.props.group, this.props.task.id), 1)
    //         copyBoard.groups[this.state.moveTo].tasks.push(this.props.task)
    //         this.props.update(copyBoard)
    //     }
    //     // this.props.history.push(`/board/${copyBoard._id}`)
    // }

    handleChange = ({ target }) => {
        console.log(target.value)
        this.setState({ moveTo: target.value })
    }
    render() {
        const {moveTask} = this.props
        return <div className="action-modal move-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="move-modal w-100 p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-1 ">Move to</h1>
                        <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.props.toggleModal('move-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content w-100">
                        <form onSubmit={(ev) => {
                            moveTask(this.state.moveTo)
                            ev.preventDefault()
                        }}>
                            <select onChange={this.handleChange}>
                                {this.props.board.groups.map((group, idx) => {
                                    return group.id === this.props.group.id && <option key={group.id} value={group.id}>{group.title}</option>
                                })}
                                {this.props.board.groups.map((group, idx) => {
                                    return group.id !== this.props.group.id && <option value={idx} key={group.id}>{group.title}</option>
                                })}
                            </select>
                            <button className="btn-copy-move">Move</button>
                        </form>
                    </div>
                </div>
            </ModalAction>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    update
}


export const MoveModal = connect(mapStateToProps, mapDispatchToProps)(_MoveModal)