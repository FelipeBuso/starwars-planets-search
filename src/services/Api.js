export default function getPlanetsFromAPI(callback) {
  const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  fetch(API_URL)
    .then((results) => results.json())
    .then((data) => callback(data.results))
    .catch((error) => new Error(error));
}
