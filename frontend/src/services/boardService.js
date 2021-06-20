import { utilService } from './generalService/utilService.js'
import { storageService } from './generalService/asyncStorageService.js'
import { httpService } from '../services/generalService/httpService.js'
import { BsBookmarkDash } from 'react-icons/bs';
import { Board } from '../pages/Board.jsx';

window.storageService = storageService;

export const boardService = {
    query,
    getById,
    remove,
    update,
    add,
    getGroupById,
    getTaskById,
    getGroupIdxById,
    checklistPreview,
    getTaskIdxById,
    checklistPrecent,
    updateTaskAtBoard,
    getTasks,

}


async function query(filterBy = '') {
    // return storageService.query(STORAGE_KEY)
    try {
        return httpService.get('board', filterBy)
    } catch (err) {
        console.log('error in query');
        throw err
    }
}

function getById(boardId) {
    // const board = storageService.get(STORAGE_KEY, boardId);
    // return board
    return httpService.get(`board/${boardId}`)

}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function add(title, background) {
    // const newBoard = _createBoard()
    // const savedBoard = storageService.post(STORAGE_KEY, newBoard)
    // return savedBoard
    const board = { title, style: { background } }
    const res = await httpService.post(`board`, board)
    return res
}

async function update(board, activity) {
    const res = await httpService.put(`board/${board._id}`, { board, activity })
    return res

}

//task crud
function getGroupById(board, groupId) {
    return board.groups.find(group => group.id === groupId);
}

function getGroupIdxById(board, groupId) {
    return board.groups.findIndex(group => group.id === groupId);
}

function getTaskIdxById(group, taskId) {
    return group.tasks.findIndex(task => task.id === taskId);
}

function getTaskById(group, taskId) {
    return group.tasks.find(task => task.id === taskId)
}

function checklistPreview(task) {
    const checklists = task.checklists
    let isDone = false
    let allTodos = 0;
    let doneTodos = 0;
    checklists.forEach(checkList => {
        allTodos += checkList.todos.length;
        checkList.todos.forEach(todo => {
            if (todo.isDone) doneTodos++
        })
    });
    if (doneTodos === allTodos && allTodos) isDone = true;
    const str = `${doneTodos}/${allTodos}`
    const res = { str, isDone }
    return res
}

function checklistPrecent(checklist) {
    let doneTodos = 0;
    checklist.todos.forEach(todo => {
        if (todo.isDone) doneTodos++
    })
    const precent = (doneTodos / checklist.todos.length) * 100

    return precent
}

function _updateTaskAtGroup(group, updateTask) {
    const idx = group.tasks.findIndex(task => {
        task.id = updateTask.id;
    })
    group.tasks.splice(idx, 1, updateTask);
    return group;
}

function _updateGroupAtBoard(board, updateGroup) {
    const idx = getGroupIdxById(board, updateGroup.id)
    board.groups[idx] = updateGroup;
    return board;
}

function updateTaskAtBoard(board, group, updateTask) {
    const updateGroup = _updateTaskAtGroup(group, updateTask);
    const updateBoard = _updateGroupAtBoard(board, updateGroup);
    return updateBoard;
}

function getTasks(groups) {
    console.log(groups);
    const tasks = [];
    groups.forEach(group => {
        group.tasks.forEach(task => {
            tasks.push(task);
        });
    })
    return tasks;
}
