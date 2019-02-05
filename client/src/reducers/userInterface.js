const initialState = {
  loaderIsShowing: true,
  errorMessage: '',
}

const userInterface = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {
        ...state,
        loaderIsShowing: true,
      }
    case 'HIDE_LOADER':
      return {
        ...state,
        loaderIsShowing: false,
      }
    case 'ERROR_MESSAGE':
      console.log('ERROR_MESSAGE', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      }
    case 'CLEAR_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state;
  }
}

export default userInterface;
