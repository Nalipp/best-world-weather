const errorMessages = (state = { errorMessage: '' }, action) => {
  switch (action.type) {
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
      return state
  }
}

export default errorMessages;
