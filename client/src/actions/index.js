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
        dispatch({
          type: 'SINGLE_FORCAST',
          payload: data
        })
      } else {
        dispatch({
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
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

