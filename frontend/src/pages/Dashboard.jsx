import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { ChartMembersTasks } from '../cmps/dashboard/ChartMembersTasks';
import { ChartLabelsTasks } from '../cmps/dashboard/ChartLabelsTasks';
import { ChartGroupsTasks } from '../cmps/dashboard/ChartGroupsTasks';
import { withRouter } from "react-router";
import { boardService } from '../services/boardService'



class _Dashboard extends Component {
    state = {
        board: null,
        tasks: null,
        groups: null,
        membersBoard: null,
        labelsBoard: null,
        workersDashboard : false
    }

    toggleDashboard(){
        this.setState({
            ...this.state ,
            workersDashboard: !this.state.workersDashboard
        })
    }

    componentDidMount() {
        const board = this.props.board;
        console.log(board);
        const tasks = boardService.getTasks(board.groups);
        const groups = board.groups;
        const membersBoard = board.members;
        const labelsBoard = board.labels;

        this.setState({
            ...this.state,
            board: board,
            groups: groups,
            tasks: tasks,
            membersBoard: membersBoard,
            labelsBoard: labelsBoard
        });
    }

    componentDidUpdate(prevProps) {

    }
    checkDataExist() {
        const { board, groups, tasks, membersBoard, labelsBoard } = this.state;
        return board && groups && tasks && membersBoard && labelsBoard;
    }

    render() {
        const { board, groups, tasks, membersBoard, labelsBoard } = this.state;
        if (!this.checkDataExist()) return <h1>Loading...</h1>
        return <div className="dashboard animate__animated animate__fadeInLeft w-100 h-100 flex column center space-between pb-1">
            <div className="dashboard-header flex ps-1 w-100 mb-1 space-evenly">

                <ul className="dashboard-header w-100 fam-3 flex center space-around font-3 c-info">
                    {/* members active*/}
                    <li className="flex center ">
                        <p>Members:{board.members.length}</p>
                    </li>
                    {/* tasks complete*/}
                    <li className="flex center">
                        <p>Tasks:{tasks.length}</p>
                    </li>
                    <li className="flex center">
                    <p>Complete Task:{` 72%`}</p>
                    </li>
                </ul>
            </div>
            <ul className="w-100 flex space-evenly h-50">
                <li className=" flex column center content-center">
                    <p className="font-3 fam-1 c-white mb-1">Tasks Per Label</p>
                    <ChartLabelsTasks labelsBoard={labelsBoard} tasks={tasks} />
                </li>
                <li className=" flex column center content-center w-70 h-100 member-chart">
                    <p className="font-3 fam-1 c-white mb-1">Tasks Per Worker</p>
                    <ChartMembersTasks membersBoard={membersBoard} tasks={tasks} />
                </li>
                <li className="flex column center content-center">
                    <p className="font-3 fam-1 c-white mb-1">Tasks Per Lists</p>
                    <ChartGroupsTasks groups={groups} tasks={tasks} />
                </li>
            </ul>
            <div className="w-100 flex space-evenly">

            </div>
            <div className="w-100 flex space-evenly">

            </div>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Dashboard))