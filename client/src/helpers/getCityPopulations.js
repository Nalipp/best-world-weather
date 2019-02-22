let citySearchTree;

export const getChoiceList = value => {
  if (citySearchTree) {
    let results = citySearchTree[value];

    return results ? results.slice(0, 6) : [];
  }

  return []
};

export const generateCitySearchTree = cities => {
  citySearchTree = generateTree(cities);
}


function generateTree(cities) {
  let tree = {};

  cities.forEach(city => {
    let curCityName = city.cityName.toLowerCase();

    for (var i = 1; i < curCityName.length + 1; i += 1) {
      let curSubstr = curCityName.slice(0, i);

      if (tree[curSubstr] === undefined) {
        tree[curSubstr] = [ [curCityName, city.population] ]
      } else {
        tree[curSubstr].push([curCityName,city.population]);
      }
    }
  });

  return tree;
}





// const buildCityPopulationTree = () => {
// }

// const initializeCityPopulation = () => {
//   axios.get('/api/populations/', res => {
//     console.log(res);
//   });
// }

// export const cityPopulationTree = () => {
// }

// initializeCityPopulation();




// export const getGeoCode = (city, cb) => {
//   city = city.split(' ').join('+');

//   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`).then((res) => {
//     if (res.data.status === 'OK') {
//       const location = res.data.results[0].geometry.location;
//       cb(location.lat, location.lng);
//     } else {
//       console.log('address not found');
//     }
//   })
// }


