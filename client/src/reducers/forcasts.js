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
    min_temperature: 65,
    max_windSpeed: 10,
    max_cloudCover: 20
  },
  resetValues: { // when applied show all forcasts
    max_temperature: Infinity,
    min_temperature: -Infinity,
    max_windSpeed: Infinity,
    max_cloudCover: Infinity,
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
    default:
      return state
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
