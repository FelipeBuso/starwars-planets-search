import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import sortPlanetsByOrder from '../helpers/order';

export default function SWProvider({ children }) {
  const initialStateFilters = {
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  };

  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(initialStateFilters);

  function savePlanets(data) {
    const ordenedData = sortPlanetsByOrder(data, filters);
    setPlanets(ordenedData);
    setIsLoading(false);
  }

  function changeLoading() {
    setIsLoading(true);
  }

  function changeFiltersByName(value) {
    const newFilter = filters;
    newFilter.filterByName.name = value;
    setFilters(newFilter);
  }

  function addFilterByNumericValue(value) {
    const newFilterNumeric = filters;
    newFilterNumeric.filterByNumericValues.push(value);
    setFilters(newFilterNumeric);
  }

  function saveFilteredPlanets(arrayFilteredPlanets) {
    const sortedArrayFilteredPlanets = sortPlanetsByOrder(arrayFilteredPlanets, filters);
    setFilteredPlanets(sortedArrayFilteredPlanets);
  }

  function addFilterByOrder(value) {
    const newFilterOrder = filters;
    newFilterOrder.order = value;
    setFilters(newFilterOrder);
    saveFilteredPlanets(filteredPlanets);
  }

  function removeFilterByNumericValue(index) {
    const newFiltersNumeric = filters.filterByNumericValues.filter(
      (filter, i) => i !== index,
    );
    const newFilter = filters;
    newFilter.filterByNumericValues = newFiltersNumeric;
    setFilters(newFilter);
  }

  const context = {
    planets: filteredPlanets,
    savePlanets,
    isLoading,
    changeLoading,
    filters,
    setFilters: changeFiltersByName,
    planetsToFilter: planets,
    saveFilteredPlanets,
    addFilterByNumericValue,
    addFilterByOrder,
    removeFilterByNumericValue,
  };

  return (
    <div>
      <SWContext.Provider value={ context }>
        { children }
      </SWContext.Provider>
    </div>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
