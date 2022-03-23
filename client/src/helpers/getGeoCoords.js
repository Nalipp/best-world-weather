import axios from 'axios';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const getGeoCoords = (dispatch, count, bounds) => {
  // Note in January of 2021 google changed the api unexpectedly from the following 
  //   commented out code, this broke the app
  //   const lats = bounds.zb // references this format {g: h: } 
  //   const lngs = bounds.Qa // references this format {g: h: } 
  //
  // Note noticed in March of 2022 google changed the api unexpectedly again from the following
  //   const lats = bounds.Ab // references this format {g: h: } 
  //   const lngs = bounds.Ra // references this format {g: h: } 
  //
  const lats = bounds.wb // references this format {g: h: } 
  const lngs = bounds.Sa // references this format {g: h: } 
  console.log('lats...', lats) 
  console.log('lngs...', lngs) 

  // 2022 also changed from lats.g to lats.j
  // const latsDiff = lats.h - lats.g;
  // const lngsDiff = lngs.h - lngs.g;
  //
  const latsDiff = lats.h - lats.j;
  const lngsDiff = lngs.h - lngs.j;


  while (count > 0) {
    // 2022 updated from lats.g to lats.j
    const newLat = (Math.random() * latsDiff) + lats.j;
    const newLng = (Math.random() * lngsDiff) + lngs.j;

    console.log('newLat...', newLat)
    console.log('newLng...', newLng)


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
