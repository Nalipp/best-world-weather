const initialState = {
  allForcasts: [],
  filteredForcasts: [],
  forcastsAreFiltered: false,
}

const forcasts = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_FORCASTS':
      return {...state, 
        allForcasts: action.payload,
      }
    case 'FILTERED_FORCASTS':
      return {...state, 
        filteredForcasts: action.payload,
      }
    case 'FORCASTS_ARE_FILTERED':
      return {
        ...state,
        forcastsAreFiltered: action.payload,
      }
    default:
      return state
  }
}

export default forcasts;
