import axios from 'axios';

export const getForcasts = () => async dispatch =>  {
  axios.get('/api/forcasts/')
    .then(res => {
      if (res.status === 200) {
        dispatch({ 
          type: 'ALL_FORCASTS', 
          payload: res.data 
        })
        dispatch({ 
          type: 'FILTER_FORCASTS', 
        })
      } else {
        dispatch({ 
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
};

export const updateCurrentValue = (filterName, value) => async dispatch => {
  // appliedValues update
  // currentValues update
  // filter is applied in reducer
  dispatch({
    type: 'UPDATE_CURRENT_FILTER',
    filterName,
    value,
  });
  dispatch({
    type: 'FILTER_FORCASTS',
  });
}

export const applyCurrentFilter = filterName => async dispatch => {
  // appliedValues is updated with currentValue for filterName
  // filter is applied in reducer
  dispatch({
    type: 'APPLY_CURRENT_FILTER',
    filterName,
  });
  dispatch({
    type: 'FILTER_FORCASTS',
  });
}

export const removeCurrentFilter = filterName => async dispatch => {
  // appliedValues is updated with resetValue for filterName
  // currentValues is not touched
  // filter is applied in reducer
  dispatch({
    type: 'REMOVE_CURRENT_FILTER',
    filterName,
  });
  dispatch({
    type: 'FILTER_FORCASTS',
  });
}
