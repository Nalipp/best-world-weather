const getGeoCoords = (count, activeBounds) => {
  const results = [];
  const lngs = activeBounds.ga;
  const lats = activeBounds.ma;
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
