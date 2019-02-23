let citySearchTree;

export const getChoiceList = value => {
  if (citySearchTree) {
    let results = citySearchTree[value];

    return results ? results.slice(0, 6) : [];
  }

  return []
};

export const generateCitySearchTree = cities => {
  citySearchTree = !citySearchTree ? generateTree(cities) : citySearchTree;
}


function generateTree(cities) {
  let tree = {};

  cities.forEach(city => {
    let curCityName = city.cityName.toLowerCase();

    for (var i = 1; i < curCityName.length + 1; i += 1) {
      let curSubstr = curCityName.slice(0, i);

      if (tree[curSubstr] === undefined) {
        tree[curSubstr] = [ [curCityName, city.population, city.latitude, city.longitude] ]
      } else {
        tree[curSubstr].push([curCityName, city.population, city.latitude, city.longitude]);
      }
    }
  });

  return tree;
}


// The generateTree() will create a object that looks something like the following.
// Allowing for constant time lookup of a city by its name and also return the population.
// 
// citySearchTree = {
//   s: [ ['shanghai', 22315474], ['shenzen', 10358381], ['seoul', 10349312] ],
//   sh: [ ['shanghai', 22315474], ['shenzen', 10358381] ],
//   sha: [ ['shanghai', 22315474] ],
//   shan: [ ['shanghai', 22315474] ],
//   shang: [ ['shanghai', 22315474] ],
//   shangh: [ ['shanghai', 22315474] ],
//   shangha: [ ['shanghai', 22315474] ],
//   shanghai: [ ['shanghai', 22315474] ],
//   she: [ ['shenzen', 10358381 ] ],
//   shen: [ ['shenzen', 10358381 ] ],
//   shenz: [ ['shenzen', 10358381 ] ],
//   shenzh: [ ['shenzen', 10358381 ] ],
//   shenzhe: [ ['shenzen', 10358381 ] ],
//   shenzhen: [ ['shenzen', 10358381 ] ],
//   se: [ ['seoul', 10349312] ],
//   seo: [ ['seoul', 10349312] ],
//   seou: [ ['seoul', 10349312] ],
//   seoul: [ ['seoul', 10349312] ],
// }

