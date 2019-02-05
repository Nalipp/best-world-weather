const initialState = {
  mapLocation1: { lat: 34.0194, lng: -118.4108 },
  mapLocation2: { lat: 13.752753, lng: 100.494086 },
  mapZoomLevel: 6,
}

const maps = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_LOCATION_1':
      return {
        ...state, 
        mapLocation1: action.payload,
      }
    case 'SET_MAP_LOCATION_2':
      return {
        ...state, 
        mapLocation2: action.payload,
      }
    case 'INCREASE_MAP_ZOOM':
      return {
        ...state, 
        mapZoomLevel: state.mapZoomLevel + 1,
      }
    case 'DECREASE_MAP_ZOOM':
      return {
        ...state, 
        mapZoomLevel: state.mapZoomLevel - 1,
      }
    case 'RESET_MAP_ZOOM':
      return {
        ...state,
        mapZoomLevel: initialState.mapZoomLevel,
      }
    default:
      return state;
  }
}

export default maps;
