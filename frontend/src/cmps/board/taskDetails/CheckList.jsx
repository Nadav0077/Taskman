import React, { Component } from 'react'
import { utilService } from '../../../services/generalService/utilService'
import { CheckListStatus } from './CheckListStatus'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheckBox } from 'react-icons/bs'


export class CheckList extends Component {
    state = {
        // checklist: this.props.checklist,
        todo: {
            txt: ''
        }
    }

    handleChange = ({ target }) => {
        const { value, name, type, checked } = target
        const computed = {
            value,
            name
        }

        type === 'checkbox' && (computed.value = checked)
        const checklistCopy = { ...this.props.checklist }

        return {
            updateTodo: (idx) => {
                checklistCopy.todos[idx][computed.name] = computed.value
                this.props.updateChecklist(checklistCopy)
            },
            addTodo: () => {
                this.setState(({ todo }) => ({ todo: { ...todo, [computed.name]: computed.value } }))
            },
            checklistTitle: () => {
                console.log('checklistCopy: ', checklistCopy)
                checklistCopy[computed.name] = computed.value
                this.props.updateChecklist(checklistCopy)
            }
        }
    }

    onRemoveTodo = (idx) => {
        const checklistCopy = { ...this.props.checklist }
        checklistCopy.todos.splice(idx, 1)
        this.props.updateChecklist(checklistCopy)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        // const todos = this.props.checklist.todos.slice()
        const checklistCopy = { ...this.props.checklist }
        const todo = { ...this.state.todo, id: utilService.makeId(), isDone: false }
        checklistCopy.todos.push(todo)
        this.setState({ todo: { txt: '' } })
        this.props.updateChecklist(checklistCopy)
    }

    render() {
        const { checklist } = this.props
        // if (!checklist) return <div>loading...</div>
        return (
            <li>
                <div className="flex space-between center">
                    <div className="flex center desc-header">
                        <BsCheckBox />
                        <input
                            onBlur={this.props.updateTask}
                            type="text"
                            value={checklist.title}
                            autoComplete="off"
                            name="title"
                            className="input-details fam-1 font-m fw-2"
                            onChange={ev => this.handleChange(ev).checklistTitle()}
                        />
                    </div>
                    <div onClick={() => {
                        this.props.onRemoveCheckList(this.props.idx)
                    }} className="btn-del-chacklist font-m cur-pointer">Delete</div>
                </div>
                <div className="margin-content">
                    {checklist.todos.length > 0 && <CheckListStatus checklist={checklist} />}
                    <ul className="todo-list">
                        {checklist.todos.map((todo, idx) => {
                            return <li key={todo.id} className="flex space-between">
                                <div>
                                    <input
                                        type="checkbox"
                                        name="isDone"
                                        checked={todo.isDone}
                                        onChange={(ev) => {
                                            this.handleChange(ev).updateTodo(idx)
                                        }
                                        } />
                                    <input
                                        className={`input-details ${todo.isDone && "done-todo"}`}
                                        type="text"
                                        name="txt"
                                        autoComplete="off"
                                        value={todo.txt}
                                        onChange={(ev) => this.handleChange(ev).updateTodo(idx)}
                                    />
                                </div>
                                <span className=""
                                    onClick={() => { this.onRemoveTodo(idx) }}
                                >
                                    <RiDeleteBin6Line className="trash-todo" /></span>
                            </li>
                        })}
                        <form onSubmit={this.onSubmit}/* {(ev) => {
                            ev.preventDefault()
                            this.handleChangeTodos(ev, -1)
                        }} */>
                            <input
                                type="text"
                                className="input-details mb-1"
                                autoComplete="off"
                                placeholder="+ Add Todo"
                                name="txt"
                                value={this.state.todo.txt}
                                onChange={ev => this.handleChange(ev).addTodo()}
                            />
                        </form>
                    </ul>
                </div>
            </li>
        )
    }
}

