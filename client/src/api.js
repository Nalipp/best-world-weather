import axios from 'axios';

export async function getForcasts() {
  return axios.get('/api/forcasts/')
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        return "Error retreiving forcasts"
      }
    })
}

