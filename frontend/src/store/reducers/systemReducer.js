const initialState = {
  isLoading: false,
  isLabelsOpen: false
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    case 'TOGGLE_LABEL':
      return { ...state, isLabelsOpen: action.value }
    default: return state
  }
}
