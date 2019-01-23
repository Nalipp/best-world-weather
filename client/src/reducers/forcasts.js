const initialState = {
  allForcasts: [],
  filteredForcasts: [],
  appliedValues: { // filters actually applied to forcast list
    max_temperature: Infinity,
    min_temperature: -Infinity,
    max_windSpeed: Infinity,
    max_cloudCover: Infinity,
  },
  currentValues: { // filter values (may or may not be applied)
    max_temperature: 80,
    min_temperature: 45,
    max_windSpeed: 10,
    max_cloudCover: 50
  },
  resetValues: { // when applied show all forcasts
    max_temperature: Infinity,
    min_temperature: -Infinity,
    max_windSpeed: Infinity,
    max_cloudCover: Infinity,
  },
  isShowing: {
    max_temperature: false,
    min_temperature: false,
    max_windSpeed: false,
    max_cloudCover: false,
  }
}

const forcasts = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_FORCASTS':
      let rounded = [...action.payload].map(forcast => {
        forcast.temperature = Math.round(forcast.temperature)
        forcast.windSpeed = Math.round(forcast.windSpeed)
        forcast.cloudCover = Math.round(forcast.cloudCover * 100)
        return forcast;
      });
      return {
        ...state, 
        allForcasts: rounded,
      }
    case 'FILTER_FORCASTS':
      return {
        ...state, 
        filteredForcasts: filterForcasts(),
      }
    case 'UPDATE_CURRENT_FILTER':
      return {
        ...state, 
        appliedValues: {
          ...state.appliedValues, [action.filterName]: action.value,
        },
        currentValues: {
          ...state.currentValues, [action.filterName]: action.value,
        },
      }
    case 'APPLY_CURRENT_FILTER':
      const currentValue = state.currentValues[action.filterName];

      return {
        ...state,
        appliedValues: {
          ...state.appliedValues, [action.filterName]: currentValue, 
        },
        filteredForcasts: filterForcasts(action.filterName, currentValue),
      }
    case 'REMOVE_CURRENT_FILTER':
      const resetValue = state.resetValues[action.filterName];

      return {
        ...state,
        appliedValues: {
          ...state.appliedValues, [action.filterName]: resetValue, 
        },
        filteredForcasts: filterForcasts(action.filterName, resetValue),
      }
    case 'RESET_FILTERS':
      return {
        ...state,
        appliedValues: {...state.resetValues},
        currentValues: {...initialState.currentValues},
        isShowing: {...initialState.isShowing},
      }
    case 'SHOW_INPUT_FILTER':
      return {
        ...state,
        isShowing: {
          ...state.isShowing, [action.filterName]: true,
        }
      }
    case 'HIDE_INPUT_FILTER':
      return {
        ...state,
        isShowing: {
          ...state.isShowing, [action.filterName]: false,
        }
      }
    case 'SORT_FILTERED_FORCASTS':
      return {
        ...state,
        filteredForcasts: getSort(action.sortBy, [...state.filteredForcasts]),
      }
    default:
      return state
  }
  function getSort(sortBy, forcasts) {
    return forcasts.sort(function(acc, forcast) {
      return acc[sortBy] > forcast[sortBy] ? 1 : -1;
    });
  }
  function filterForcasts() {
    const applied = state.appliedValues;
    return [...state.allForcasts].filter(forcast => {
      return forcast.temperature > applied.min_temperature &&
             forcast.temperature < applied.max_temperature &&
             forcast.windSpeed < applied.max_windSpeed &&
             forcast.cloudCover < applied.max_cloudCover
    })
  }

}

export default forcasts;
