import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/api';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('0');
  // const [filters, setFilters] = useState({ filterByName: { name: '' },
  //   filterByNumericValues: [] });
  const [theRender, setTheRender] = useState([]);
  const [name, setName] = useState('');
  const [numeric, setNumeric] = useState([]);

  useEffect(() => {
    setTheRender(data);
    if (name !== '') {
      const filteredPlanets = data
        .filter((planet) => planet.name.toLowerCase().includes(name));
      setTheRender(filteredPlanets);
    } else if (name === '') {
      setTheRender(data);
    }
  }, [data, name]);

  useEffect(() => {
    if (numeric !== []) {
      numeric.forEach((curr) => {
        let filterPlanetsByNums;
        if (curr.comparison === 'maior que') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) > Number(curr.value));
          setTheRender(filterPlanetsByNums);
        } else if (curr.comparison === 'menor que') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) < Number(curr.value));
          setTheRender(filterPlanetsByNums);
        } else if (curr.comparison === 'igual a') {
          filterPlanetsByNums = data
            .filter((planet) => Number(planet[curr.column]) === Number(curr.value));
          setTheRender(filterPlanetsByNums);
        }
      });
    }
  }, [data, numeric]);

  function handleFilterButton() {
    const arr = [...numeric];
    arr.push({ column, comparison, value });
    setNumeric([...arr]);
    // console.log(numeric);
  }

  async function asyncFunc() {
    setData(await fetchPlanets());
  }

  useEffect(() => {
    asyncFunc();
  }, []);

  function handleInputPlanet(event) {
    setName(event.target.value);
  }

  const valuesContext = {
    handleInputPlanet,
    data,
    setColumn,
    setComparison,
    setValue,
    handleFilterButton,
    theRender,
    numeric,
  };

  return (
    <PlanetsContext.Provider value={ valuesContext }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node.isRequired,
};
