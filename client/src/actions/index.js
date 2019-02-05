import axios from 'axios';

export const getForcasts = () => async dispatch =>  {
  axios.get('/api/forcasts/')
    .then(res => {
      if (res.status === 200) {
        dispatch({ 
          type: 'ALL_FORCASTS', 
          payload: res.data 
        })
        dispatch(filterForcasts())
      } else {
        dispatch({ 
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
};

export const getForcast = (cityName, lat, lng) => async dispatch => {
  axios.post('/api/forcast/', { lat, lng, })
    .then(res => {
      if (res.status === 200) {
        const data = res.data
        data.cityName = cityName;
        data.lat = lat;
        data.lng = lng;
        dispatch(setLocationDetail(data));
        dispatch({
          type: 'ADD_SINGLE_FORCAST',
          payload: data,
        });
      } else {
        dispatch({
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
}


// Maps
// ************************************************** 

export const increaseMapZoom = () => async dispatch => {
  dispatch({
    type: 'INCREASE_MAP_ZOOM',
  })
}

export const decreaseMapZoom = () => async dispatch => {
  dispatch({
    type: 'DECREASE_MAP_ZOOM',
  })
}

// export const setMapLocation1 = mapLocation => async dispatch => {
//   dispatch({
//     type: 'SET_MAP_LOCATION_1',
//     payload: mapLocation,
//   })
// }

export const setMapLocation1 = (cityName, lat, lng) => async dispatch => {
  dispatch({
    type: 'SET_MAP_LOCATION_1',
    payload: { cityName, lat, lng, },
  })
}

export const setMapLocation2 = (cityName, lat, lng) => async dispatch => {
  dispatch({
    type: 'SET_MAP_LOCATION_2',
    payload: { cityName, lat, lng, },
  })
}

export const resetMapLocation1 = () => async dispatch => {
  dispatch ({
    type: 'SET_MAP_LOCATION_1',
    payload: null,
  })
}

export const resetMapLocation2 = () => async dispatch => {
  dispatch ({
    type: 'SET_MAP_LOCATION_2',
    payload: null,
  })
}

export const resetMapZoom = () => async dispatch => {
  dispatch({
    type: 'RESET_MAP_ZOOM',
  })
}


// Forcasts
// ************************************************** 


export const setLocationDetail = forcast => async dispatch => {
  dispatch({
    type: 'SET_LOCATION_DETAIL',
    payload: forcast,
  })
  dispatch({
    type: 'RESET_MAP_ZOOM',
  })
  dispatch({
    type: 'SET_MAP_LOCATION_1',
    payload: forcast,
  })
}

export const showLocationDetail = () => async dispatch => {
  dispatch({
    type: 'SHOW_LOCATION_DETAIL',
  })
}

export const hideLocationDetail = () => async dispatch => {
  dispatch({
    type: 'HIDE_LOCATION_DETAIL',
  })
}

export const filterForcasts = () => async dispatch => {
  dispatch({
    type: 'FILTER_FORCASTS',
  });
}

export const updateCurrentValue = (filterName, value) => async dispatch => {
  dispatch({
    type: 'UPDATE_CURRENT_FILTER',
    filterName,
    value,
  });
  dispatch(filterForcasts());
}

export const applyCurrentFilter = filterName => async dispatch => {
  dispatch({
    type: 'APPLY_CURRENT_FILTER',
    filterName,
  });
  dispatch(filterForcasts());
}

export const removeCurrentFilter = filterName => async dispatch => {
  dispatch({
    type: 'REMOVE_CURRENT_FILTER',
    filterName,
  });
  dispatch(filterForcasts());
}

export const setSortedBy = sortBy => async dispatch => {
  dispatch({
    type: 'SET_SORTED_BY',
    sortBy,
  });
  dispatch(filterForcasts());
}

export const resetFilters = () => async dispatch => {
  dispatch({
    type: 'RESET_FILTERS',
  });
  dispatch(filterForcasts());
}

export const showInputFilter = filterName => async dispatch => {
  dispatch({
    type: 'SHOW_INPUT_FILTER',
    filterName,
  });
}

export const hideInputFilter = filterName => async dispatch => {
  dispatch({
    type: 'HIDE_INPUT_FILTER',
    filterName,
  });
}

export const showFilters = () => async dispatch => {
  dispatch({
    type: 'SHOW_FILTERS',
  });
}

export const hideFilters = () => async dispatch => {
  dispatch({
    type: 'HIDE_FILTERS',
  });
}

