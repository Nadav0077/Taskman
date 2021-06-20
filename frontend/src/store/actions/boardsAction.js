import { boardService } from '../../services/boardService'
import { socketService } from '../../services/generalService/socketService'
import { utilService } from '../../services/generalService/utilService'

export function query(filterByTitle = '') { // Action Creator
    return async dispatch => {
        const boards = await boardService.query(filterByTitle)
        const action = {
            type: 'SET_BOARDS',
            boards
        }
        dispatch(action)
    }
}

export function loadBoard(boardId) { // Action Creator

    return async dispatch => {
        const board = await boardService.getById(boardId);
        board.labels = [
            {id: "l101", title: "Tamir", color: "#fc5c65"},
            {id: "l102", title: "Nadav", color: "#fd9644"},
            {id: "l103", title: "Harel", color: "#fed330"},
            {id: "l104", title: "Done", color: "#26de81"},
            {id: "l105", title: "Help", color: "#45aaf2"},
            {id: "l106", title: "QA", color: "#4b7bec"},
            {id: "l107", title: "UI", color: "#a55eea"},
            {id: "l108", title: "Dev", color: "#778ca3"},
            ]
        const action = {
            type: 'SET_BOARD',
            board
        }
        dispatch(action)
    }
}

export function setBoard(board) { 
    return async dispatch => {
        const action = {
            type: 'SET_BOARD',
            board
        }
        dispatch(action)
    }
}




export function remove(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            const action = {
                type: 'REMOVE_BOARD',
                boardId
            }
            dispatch(action)
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}


export function update(board,activity) {
    // Action Creator
    return async dispatch => {
        try {      
            const copyBoard = utilService.deepClone(board)
            copyBoard.activities.unshift(activity)
            const action = {
                type: 'UPDATE_BOARD',
                updatedBoard: copyBoard
            }
            dispatch(action)

            delete board.activities
            socketService.emit('update board',copyBoard)
            const updatedBoard = await boardService.update(board,activity)
        } catch (err){
            console.log('BoardActions: err in update board', err)
        }
    }
}

export function add(title, background) {
    // Action Creator
    return async dispatch => {
        try {
            const newBoard = await boardService.add(title,background)          
            const action = {
                type: 'ADD_BOARD',
                board: newBoard
            }
            dispatch(action)
        } catch (err){
            console.log('BoardActions: err in addBoard', err)
        }
    }
}
