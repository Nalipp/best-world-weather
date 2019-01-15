const forcasts = (state = [], action) => {
  switch (action.type) {
    case 'ALL_CITIES':
      return action.payload
    default:
      return state
  }
}

export default forcasts;
