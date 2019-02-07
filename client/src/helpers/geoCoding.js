import axios from 'axios';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const getGeoCode = (city, cb) => {
  city = city.split(' ').join('+');

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`).then((res) => {
    const location = res.data.results[0].geometry.location;
    cb(location.lat, location.lng);
  })
}


