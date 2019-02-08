import getGeoCoords from '../helpers/getGeoCoords'
const GEO_COORDS_COUNT = 8;

const initialState = {
  mapLocation1: null,
  mapLocation2: null,
  mapImagesLocation: null,
  mapZoomLevel: 9,
  bounds: null,
  activeBounds: null,
  geoCoords: [],
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
    case 'RESET_MAP_ZOOM':
      return {
        ...state,
        mapZoomLevel: initialState.mapZoomLevel,
      }
    case 'SET_BOUNDS':
      const setActive = state.bounds === null ? 
        action.payload : state.activeBounds;
      return {
        ...state,
        bounds: action.payload,
        activeBounds: setActive,
      }
    case 'APPLY_ACTIVE_BOUNDS':
      return {
        ...state,
        activeBounds: state.bounds,
        geoCoords: getGeoCoords(GEO_COORDS_COUNT, state.bounds)
      }
    default:
      return state;
  }
}

export default maps;
