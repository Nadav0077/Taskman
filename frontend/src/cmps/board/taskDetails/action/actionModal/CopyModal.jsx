import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { LabelTask } from '../LabelTask'
import { update } from '../../../../../store/actions/boardsAction';
import { boardService } from '../../../../../services/boardService'
import { utilService } from '../../../../../services/generalService/utilService';


class _CopyModal extends Component {
    state = {
        copyTo: null
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    copyTask = () => {
        if (this.state.copyTo !== this.props.group.id) {
            const copyBoard = { ...this.props.board }
            const task = { ...this.props.task }
            task.id = utilService.makeId()
            copyBoard.groups[this.state.copyTo].tasks.push(task)
            this.props.update(copyBoard)
        }
    }

    handleChange = ({ target }) => {
        console.log(target.value)
        this.setState({ copyTo: target.value })
    }
    render() {
        return <div className="action-modal copy-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="copy-modal p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-1">Copy</h1>
                        <span className="cur-pointer fam-1 font-1 bold" onClick={() => { this.props.toggleModal('duedate-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <form onSubmit={(ev) => {
                            this.copyTask()
                            ev.preventDefault()
                        }}>
                            <select onChange={this.handleChange}>
                                {this.props.board.groups.map((group) => {
                                    return group.id === this.props.group.id && <option key={group.id} value={group.id}>{group.title}</option>
                                })}
                                {this.props.board.groups.map((group, idx) => {
                                    return group.id !== this.props.group.id && <option value={idx} key={group.id}>{group.title}</option>
                                })}
                            </select>
                            <button className="btn-copy-move">Copy</button>
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


export const CopyModal = connect(mapStateToProps, mapDispatchToProps)(_CopyModal)