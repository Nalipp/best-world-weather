const initialState = {
  allForcasts: [],
  filteredForcasts: [],
  locationDetailOn: false,
  singleForcast: null,
  sortedBy: 'iconPoints',
  reverseSort: false,
  appliedValues: { // filters actually applied to forcast list
    min_temperature: -Infinity,
    max_humidity: 100,
    min_sunlight: 0,
  },
  currentValues: { // filter values (may or may not be applied)
    min_temperature: 72,
    max_humidity: 80,
    min_sunlight: 10,
  },
  resetValues: { // when applied show all forcasts
    min_temperature: -Infinity,
    max_humidity: 100,
    min_sunlight: 0,
  },
  isShowing: {
    min_temperature: false,
    max_humidity: false,
    min_sunlight: false,
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
        filteredForcasts: filterForcasts(),
      }
    case 'REMOVE_CURRENT_FILTER':
      const resetValue = state.resetValues[action.filterName];

      return {
        ...state,
        appliedValues: {
          ...state.appliedValues, [action.filterName]: resetValue, 
        },
        filteredForcasts: filterForcasts(),
      }
    case 'SET_SORTED_BY':
      return {
        ...state,
        sortedBy: action.sortBy,
        reverseSort: !state.reverseSort,
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
    case 'ADD_SINGLE_FORCAST':
      const removeDuplicatesFromAllForcasts = state.allForcasts.slice()
        .filter(forcast => {
          return (forcast.cityName.toLowerCase() !== action.payload.cityName.toLowerCase())
        });

      const removeDuplicatesFromFilteredForcasts = state.filteredForcasts.slice()
        .filter(forcast => {
          return (forcast.cityName.toLowerCase() !== action.payload.cityName.toLowerCase())
        });

      return {
        ...state,
        allForcasts: [action.payload, ...removeDuplicatesFromAllForcasts],
        filteredForcasts: [action.payload, ...removeDuplicatesFromFilteredForcasts],
      }
    case 'SET_LOCATION_DETAIL':
      return {
        ...state,
        singleForcast: action.payload,
      }
    case 'SHOW_LOCATION_DETAIL':
      return {
        ...state,
        locationDetailOn: true,
      }
    case 'HIDE_LOCATION_DETAIL':
      return {
        ...state,
        locationDetailOn: false,
      }
    default:
      return state
  }
  function filterForcasts() {
    const applied = state.appliedValues;
    const sortBy = state.sortedBy;

    let filtered = state.allForcasts.slice().filter(forcast => {
      return forcast.temperature > applied.min_temperature &&
             forcast.sunlightHours > applied.min_sunlight &&
             forcast.humidity * 100 < applied.max_humidity
    });

    let sorted = filtered.sort(function(acc, forcast) {
      return acc[sortBy] < forcast[sortBy] ? 1 : -1;
    });

    return state.reverseSort ? sorted.reverse() : sorted;
  }

}

export default forcasts;
