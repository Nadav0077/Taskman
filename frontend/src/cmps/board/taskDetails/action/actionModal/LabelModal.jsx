import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { LabelTask } from '../LabelTask'



class _LabelModal extends Component {
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }
    render() {
        const labels = this.props.board.labels;
        return <div className="action-modal label-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="label-modal p-abs flex column pad-07">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-1 ">Label</h1>
                        <span className="cur-pointer fam-1 font-1 bold" onClick={() => { this.props.toggleModal('label-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content h-100 flex center">
                        <ul className="h-100 w-100 flex column space-evenly center">
                            {labels.map((label) => <LabelTask key={label.id} label={label} task={this.props.task} updateTaskLabel={this.props.updateTaskLabel}/>)}

                        </ul>
                    </div>
                </div>
            </ModalAction>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}


export const LabelModal = connect(mapStateToProps, mapDispatchToProps)(_LabelModal)