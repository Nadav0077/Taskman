const initialState = {
    boards: [],
    board: null
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'ADD_BOARD':
            return { ...state, board: action.newBoard }
        case 'UPDATE_BOARD':
            return { ...state, board: action.updatedBoard }
        case 'REMOVE_BOARD':
            return { ...state, board: null ,boards: state.boards.filter(board => board._id !== action.boardId)}
        default:
            return state
    }
}