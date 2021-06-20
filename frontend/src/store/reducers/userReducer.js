let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)
const defUser = {
  "_id": "60b8a7f7f2ba7731f277d924",
  "username": "TamirM",
  "fullname": "Tamir Matz",
  "email" : "tamirmatz@gmail.com",
  "password": "aBambi123",
  "imgUrl":"https://res.cloudinary.com/dxsv4c229/image/upload/v1622708295/download_rjc2b5.jpg",
}


const initialState = {
  loggedInUser: defUser,
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'SET_USERS':
      return { ...state, users: action.users }
    default:
      return state
  }
}
