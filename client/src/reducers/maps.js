const initialState = {
  mapLocation1: null,
  mapLocation2: { cityName: "San francisco", lat: 37.7749295, lng: -122.4194155 },
  mapImagesLocation: null,
  mapZoomLevel: 10,
  bounds: null,
  geoCoords: [],
  fullScreenImages: false,
  cityPopulations: [],
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
    case 'SET_MAP_IMAGES_LOCATION':
      return {
        ...state, 
        mapImagesLocation: action.payload,
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
    case 'RESET_MAP_IMAGES_LOCATION':
      return {
        ...state,
        mapImagesLocation: null,
      }
    case 'SET_BOUNDS':
      return {
        ...state,
        bounds: action.payload,
      }
    case 'RESET_GEO_COORDS':
      return {
        ...state,
        geoCoords: [],
      }
    case 'ADD_GEO_COORD':
      return {
        ...state,
        geoCoords: [...state.geoCoords, action.payload],
      }
    case 'ACTIVATE_FULL_SCREEN_IMAGES':
      return {
        ...state,
        fullScreenImages: true,
      }
    case 'DISABLE_FULL_SCREEN_IMAGES':
      return {
        ...state,
        fullScreenImages: false,
      }
    case 'SET_CITY_POPULATIONS':
      return {
        ...state, 
        cityPopulations: action.payload,
      }
    default:
      return state;
  }
}

export default maps;
