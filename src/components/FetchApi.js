import { useState, useEffect } from 'react';

function FetchApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    getPlanets();
  }, []);

  return ({
    data,
  });
}

export default FetchApi;
