const getGeoCoords = (count, bounds) => {
  const results = [];
  const lngs = bounds.ga;
  const lats = bounds.ma;
  const latsDiff = lats.l - lats.j;
  const lngsDiff = lngs.l - lngs.j;

  while (results.length < count) {
    const newLat = (Math.random() * latsDiff) + lats.j;
    const newLng = (Math.random() * lngsDiff) + lngs.j;

    results.push([newLat, newLng]);
  }
  
  return results;
}

export default getGeoCoords;
