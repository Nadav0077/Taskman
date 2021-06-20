import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';


// import { rootReducer } from './reducers'
import { userReducer } from './reducers/userReducer.js'
import { systemReducer } from './reducers/systemReducer.js'
import { reviewReducer } from './reducers/reviewReducer.js'
import { boardReducer } from './reducers/boardReducer.js'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
