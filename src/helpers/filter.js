export default function filterPlanetsByNumericValues(planets, numericValues) {
  const { comparison, column, value } = numericValues;
  switch (comparison) {
  case 'maior que':
    return (
      planets.filter((planet) => (
        parseFloat(planet[column]) > parseFloat(value)))
    );
  case 'menor que':
    return (
      planets.filter((planet) => (
        parseFloat(planet[column]) < parseFloat(value)))
    );
  case 'igual a':
    return (
      planets.filter((planet) => (
        parseFloat(planet[column]) === parseFloat(value)))
    );
  default:
    break;
  }
}
