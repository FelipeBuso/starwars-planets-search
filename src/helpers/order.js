export default function sortPlanetsByOrder(arrayOfPlanets, filters) {
  const { order } = filters;
  const { column, sort } = order;
  function compare(a, b) {
    let itemA;
    let itemB;

    if (column === 'name') {
      itemA = a[column].toLowerCase();
      itemB = b[column].toLowerCase();
    } else {
      itemA = parseFloat(a[column]);
      itemB = parseFloat(b[column]);
    }

    const desc = -1;
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = desc;
    }
    return sort === 'ASC' ? comparison : comparison * desc;
  }
  let sortedPlanets = [];
  sortedPlanets = arrayOfPlanets.sort(compare);
  return sortedPlanets;
}
