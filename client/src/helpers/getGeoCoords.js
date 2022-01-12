import axios from 'axios';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log('GOOGLE_API_KEY...', GOOGLE_API_KEY)

const getGeoCoords = (dispatch, count, bounds) => {
  console.log('bounds...', bounds)
  // Note in January of 2021 google changed the api unexpectedly from the following 
  // commented out code, this broke the app
  // const lats = bounds.zb // references this format {g: h: } 
  // const lngs = bounds.Qa // references this format {g: h: } 

  const lats = bounds.Ab // references this format {g: h: } 
  const lngs = bounds.Ra // references this format {g: h: } 

  const latsDiff = lats.h - lats.g;
  const lngsDiff = lngs.h - lngs.g;

  while (count > 0) {
    const newLat = (Math.random() * latsDiff) + lats.g;
    const newLng = (Math.random() * lngsDiff) + lngs.g;


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
