import getGeoCoords from '../helpers/getGeoCoords';
import axios from 'axios';
const GEO_COORDS_COUNT = 15;
const PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

export const getForcasts = () => dispatch =>  {
  axios.get('/api/forcasts/')
    .then(res => {
      if (res.status === 200) {
        dispatch({ 
          type: 'ALL_FORCASTS', 
          payload: res.data.map(forcast => {
            return {
              ...forcast, 
              cityName: removeUnderscore(forcast.cityName)
            }
          }) 
        })
        dispatch(filterForcasts())
        dispatch(hideLoader())
      } else {
        dispatch({ 
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
};

export const getForcast = (cityName, lat, lng) => dispatch => {
  dispatch(showLoader());
  axios.post('/api/forcast/', { lat, lng, })
    .then(res => {
      if (res.status === 200) {
        const data = res.data
        data.cityName = capitalize(cityName);
        data.lat = lat;
        data.lng = lng;
        dispatch(setLocationDetail(data, cityName));
        dispatch({
          type: 'ADD_SINGLE_FORCAST',
          payload: data,
        });
        dispatch(hideLoader())
      } else {
        dispatch({
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
}

export const loadCityPopulations = () => dispatch => {
  axios.get('/api/populations/')
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: 'SET_CITY_POPULATIONS',
          payload: res.data,
        })
      } else {
        console.log('there was an error');
      }
    })
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function removeUnderscore(str) {
  return str.split('_').join(' ');
}


// UserInterface
// ************************************************** 

export const showLoader = () => dispatch => {
  dispatch({
    type: 'SHOW_LOADER',
  })
}

export const hideLoader = () => dispatch => {
  dispatch({
    type: 'HIDE_LOADER',
  })
}


// Maps
// ************************************************** 

export const increaseMapZoom = () => dispatch => {
  dispatch({
    type: 'INCREASE_MAP_ZOOM',
  })
}

export const decreaseMapZoom = () => dispatch => {
  dispatch({
    type: 'DECREASE_MAP_ZOOM',
  })
}

export const setMapLocation1 = (cityName, lat, lng) => dispatch => {
  dispatch({
    type: 'SET_MAP_LOCATION_1',
    payload: { cityName, lat, lng, },
  })
}

export const setMapLocation2 = (cityName, lat, lng) => dispatch => {
  dispatch({
    type: 'SET_MAP_LOCATION_2',
    payload: { cityName, lat, lng, },
  })
}

export const setMapImagesLocation = (cityName, lat, lng) => dispatch => {
  dispatch({
    type: 'SET_MAP_IMAGES_LOCATION',
    payload: { cityName, lat, lng, },
  })
}

export const resetMapLocation1 = () => dispatch => {
  dispatch ({
    type: 'SET_MAP_LOCATION_1',
    payload: null,
  })
}

export const resetMapLocation2 = () => dispatch => {
  dispatch ({
    type: 'SET_MAP_LOCATION_2',
    payload: null,
  })
}

export const resetMapImagesLocation = () => dispatch => {
  dispatch ({
    type: 'SET_MAP_IMAGES_LOCATION',
    payload: null,
  })
}

export const setBounds = bounds => async dispatch => {
  dispatch({
    type: 'SET_BOUNDS',
    payload: bounds,
  })
  await dispatch({
    type: 'RESET_GEO_COORDS',
  })
  getGeoCoords(dispatch, GEO_COORDS_COUNT, bounds)
}

export const addGeoCoords = (count, bounds) => dispatch => {
  getGeoCoords(dispatch, count, bounds)
}

export const activateFullScreenImages = () => dispatch => {
  dispatch({
    type: 'ACTIVATE_FULL_SCREEN_IMAGES',
  })
}

export const disableFullScreenImages = () => dispatch => {
  dispatch({
    type: 'DISABLE_FULL_SCREEN_IMAGES',
  })
}

// Forcasts
// ************************************************** 


export const setLocationDetail = forcast => async dispatch => {
  dispatch(getPixabayImages(forcast.cityName))
  dispatch({
    type: 'SET_LOCATION_DETAIL',
    payload: forcast,
  })
  dispatch({
    type: 'SET_MAP_LOCATION_1',
    payload: forcast,
  })
  await dispatch({
    type: 'RESET_MAP_IMAGES_LOCATION',
  })
  dispatch({
    type: 'SET_MAP_IMAGES_LOCATION',
    payload: forcast,
  })
}

export const showLocationDetail = () => dispatch => {
  dispatch({
    type: 'SHOW_LOCATION_DETAIL',
  })
}

export const hideLocationDetail = () => dispatch => {
  dispatch({
    type: 'HIDE_LOCATION_DETAIL',
  })
}

export const filterForcasts = () => dispatch => {
  dispatch({
    type: 'FILTER_FORCASTS',
  });
}

export const updateCurrentValue = (filterName, value) => dispatch => {
  dispatch({
    type: 'UPDATE_CURRENT_FILTER',
    filterName,
    value,
  });
  dispatch(filterForcasts());
}

export const applyCurrentFilter = filterName => dispatch => {
  dispatch({
    type: 'APPLY_CURRENT_FILTER',
    filterName,
  });
  dispatch(filterForcasts());
}

export const removeCurrentFilter = filterName => dispatch => {
  dispatch({
    type: 'REMOVE_CURRENT_FILTER',
    filterName,
  });
  dispatch(filterForcasts());
}

export const setSortedBy = sortBy => dispatch => {
  dispatch({
    type: 'SET_SORTED_BY',
    sortBy,
  });
  dispatch(filterForcasts());
}

export const resetFilters = () => dispatch => {
  dispatch({
    type: 'RESET_FILTERS',
  });
  dispatch(filterForcasts());
}

export const showInputFilter = filterName => dispatch => {
  dispatch({
    type: 'SHOW_INPUT_FILTER',
    filterName,
  });
}

export const hideInputFilter = filterName => dispatch => {
  dispatch({
    type: 'HIDE_INPUT_FILTER',
    filterName,
  });
}

// pixaBay Images
// ************************************************** 

export const getPixabayImages = cityName => dispatch => {
  cityName =cityName.split(' ').join('+');
  axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${cityName}&image_type=photo&pretty=true&category=places`).then(res => {
    dispatch({
      type: 'SET_PIXABAY_IMAGES',
      payload: res.data.hits,
    })
  });
}

export const showFullPixabayImage = () => dispatch => {
  dispatch({
    type: 'SHOW_FULL_PIXABAY_IMAGE',
  })
}

export const hideFullPixabayImage = () => dispatch => {
  dispatch({
    type: 'HIDE_FULL_PIXABAY_IMAGE',
  })
}
