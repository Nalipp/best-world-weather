import axios from 'axios';

export const getForcasts = () => async dispatch =>  {
  axios.get('/api/forcasts/')
    .then(res => {
      if (res.status === 200) {
        dispatch({ 
          type: 'ALL_FORCASTS', 
          payload: res.data 
        })
      } else {
        dispatch({ 
          type: 'ERROR_MESSAGE', 
          payload: 'error connecting to the database'
        })
      }
    })
};

export const applyFilter = (forcastState, filter, name) => async dispatch => {
  console.log('forcastState...', forcastState);
  let copy;

  if (forcastState.forcastsAreFiltered) {
    copy = forcastState.filteredForcasts.slice();
  } else {
    copy = forcastState.allForcasts.slice();
    dispatch({
      type: 'FORCASTS_ARE_FILTERED',
      payload: true,
    });
  }

  copy.pop();

  dispatch({
    type: 'FILTERED_FORCASTS',
    payload: copy,
  });

};

