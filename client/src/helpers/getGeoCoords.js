import axios from 'axios';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const getGeoCoords = (dispatch, count, bounds) => {
  const lngs = bounds.ga;
  const lats = bounds.ma;
  const latsDiff = lats.l - lats.j;
  const lngsDiff = lngs.l - lngs.j;

  while (count > 0) {
    const newLat = (Math.random() * latsDiff) + lats.j;
    const newLng = (Math.random() * lngsDiff) + lngs.j;

    axios.get(`https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=${newLat},${newLng}&fov=90&heading=235&pitch=10&key=${GOOGLE_API_KEY}`).then(image => {
      if (image.data.status === 'OK') {
        dispatch({
          type: 'ADD_GEO_COORD',
          payload: [newLat, newLng],
        })
      }
    })

    count -= 1;
  }
}

export default getGeoCoords;
