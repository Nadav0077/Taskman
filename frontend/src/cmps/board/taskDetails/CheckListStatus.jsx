import { boardService } from '../../../services/boardService.js'
import React, { Component } from 'react'

export class CheckListStatus extends Component {
    render() {
        const precent = boardService.checklistPrecent(this.props.checklist)
        return (
            <div className="mail-status flex center">
                <span className="checklist-progress-percentage">{Math.round(precent)}%</span>
                <div className="bar-container">
                    <div className={`bar-proccess ${precent === 100 && "done-proccess"}`} style={{width: `${precent}%`}}></div>
                </div>
            </div>
        )
    }
}