import axios from 'axios';

export const getGeoCode = (city, cb) => {
  city = city.split(' ').join('+');

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBvwtjPflzBTky_tl2BR8DeJBI_5HkK5zg`).then((res) => {
    const location = res.data.results[0].geometry.location;
    cb(location.lat, location.lng);
  })
}


