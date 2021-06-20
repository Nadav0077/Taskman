import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiEdit2 } from 'react-icons/fi'
import { withRouter } from "react-router";
import { update } from '../../../../store/actions/boardsAction';
import { boardService } from '../../../../services/boardService';

class _LabelTask extends Component {
    state = {
        isDisable: true,
        titleLabel: this.props.label.title ? this.props.label.title : '',
        task: null,
        group: null
    }

    componentDidMount() {
        const { taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({ ...this.state, task: task, group: group });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            const { boardId, taskId, groupId } = this.props.match.params;
            const board = { ...this.props.board };
            const group = boardService.getGroupById(board, groupId);
            const task = boardService.getTaskById(group, taskId);
            this.setState({ ...this.state, task: task, group: group });
        }

    }

    toggleLabel(labelId, nameInput) {
        const { task, group } = this.state;
        const board = { ...this.props.board };
        if (!task.labelIds) {
            task.labelIds = []
        }
        const labelIdx = task.labelIds.findIndex(currLabelId => currLabelId === labelId);
        if (labelIdx > -1) {
            task.labelIds.splice(labelIdx, 1)
        } else task.labelIds.push(labelId)
        this.props.updateTaskLabel(task)
        // const updateBoard = boardService.updateTaskAtBoard(board, group, task);
        // this.props.update(updateBoard)
    }

    toggleDisable(nameInput) {
        document.querySelector(`.${nameInput}`).disabled = !(document.querySelector(`.${nameInput}`).disabled); 
        this.setState({
            isDisable: !this.state.isDisable
        })
    }

    borderLabel = (task, labelId) => {
        if (task.labelIds) {
            if (task.labelIds.includes(labelId))
                return 'border';
        }
        return '';
    }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({
            ...this.state,
            titleLabel: value
        });
        const label = this.props.label;
        label.title = target.value;
        this.updateLabelBoard(label);
    }

    updateLabelBoard = (label) => {
        const { board } = this.props;
        const idx = board.labels.findIndex(currLabel => currLabel.id === label.id);
        board.labels.splice(idx, 1, label);
        this.props.update(board);
    };

    render() {
        const task = this.props.task;
        if(!task) return <h1>lodaing...</h1>
        const { label } = this.props;
        let className;
        if (task) {
            className = this.borderLabel(task, label.id);
        }
        const nameInput = `label-${label.id}`;
        return (
            <div className="label flex center space-between w-100 pad-s h-20" data-label={label.id}>
                <div className={`wrap-label ${className} w-90`} onClick={() => this.toggleLabel(label.id, nameInput)}
                >
                    <input
                        type="text"
                        name={nameInput}
                        value={this.state.titleLabel}
                        style={{ background: `${label.color}` }}
                        className={`label-input ${nameInput} ${this.state.isDisable}  cur-pointer`}
                        onChange={this.handleChange}
                        maxLength={13}
                        disabled
                    />
                </div>
                    <span onClick={() => { this.toggleDisable(nameInput) }} className="edit-label ps-1"><FiEdit2 /> </span>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    update
}


export const LabelTask = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LabelTask))