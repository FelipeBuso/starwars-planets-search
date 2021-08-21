import React, { useContext, useEffect, useState } from 'react';
import SWContext from '../context/SWContext';
import getPlanetsFromAPI from '../services/Api';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';
import Filters from './Filters';
import filterPlanetsByNumericValues from '../helpers/filter';
import '../styles/Table.css';

export default function Table() {
  const {
    planets,
    savePlanets,
    isLoading,
    changeLoading,
    filters,
    setFilters,
    planetsToFilter,
    saveFilteredPlanets,
    addFilterByNumericValue,
    addFilterByOrder,
    removeFilterByNumericValue,
  } = useContext(SWContext);

  const [filterName, setFilterName] = useState('');

  function savePlanetsfromApi() {
    changeLoading();
    getPlanetsFromAPI(savePlanets);
  }

  useEffect(savePlanetsfromApi, []);

  function filterPlanetsByName() {
    const filteredPlanetsByName = planetsToFilter.filter((planet) => (
      (new RegExp(filterName, 'i')).test(new RegExp(planet.name, 'i'))
    ));
    saveFilteredPlanets(filteredPlanetsByName);
  }

  const initialArrayColum = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const initialNumericValues = {
    column: 'population',
    comparison: 'maior que',
    value: '',
  };

  const [numericValues, setNumericValues] = useState(initialNumericValues);
  const [filteredColumn, setFilteredColumn] = useState(initialArrayColum);

  function filterColumn() {
    const columnsUsed = filters.filterByNumericValues.map((filter) => filter.column);
    let unusedColumns = [];
    columnsUsed.forEach((column) => {
      unusedColumns = filteredColumn.filter((itemColumn) => itemColumn !== column);
    });
    setFilteredColumn(unusedColumns);
  }

  function saveNewFilterNumeric() {
    addFilterByNumericValue(numericValues);
    const filteredPlanetsBynumericValue = filterPlanetsByNumericValues(
      planets,
      numericValues,
    );
    saveFilteredPlanets(filteredPlanetsBynumericValue);
    filterColumn();
  }

  function handlerNumericValues({ target }) {
    const { name, value } = target;
    setNumericValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [index, setIndex] = useState(null);

  function setIndexRemove(indexFilter) {
    setIndex(indexFilter);
  }

  function removeFilter() {
    removeFilterByNumericValue(index);
  }
  useEffect(removeFilter, [index]);

  useEffect(filterPlanetsByName, [filterName, planetsToFilter, index]);

  function renderNumericFiltersApplied() {
    return (
      <div className="filters-applied-section">
        { filters.filterByNumericValues.map((filter, i) => (
          <div data-testid="filter" key={ i }>
            <span>{ filter.column }</span>
            <span>{ filter.comparison }</span>
            <span>{ filter.value }</span>
            <button
              type="button"
              onClick={ () => setIndexRemove(i) }
            >
              X
            </button>
          </div>
        )) }
      </div>
    );
  }

  function renderFilterNumericValues() {
    return (
      <div className="filter-numeric-section">
        <label htmlFor="column-filter">
          Filter by:

          <select
            name="column"
            data-testid="column-filter"
            onChange={ (e) => handlerNumericValues(e) }
          >
            { filteredColumn.map((column, i) => (
              <option
                key={ i }
                value={ column }
              >
                { column }
              </option>
            ))}
          </select>
        </label>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => handlerNumericValues(e) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ (e) => handlerNumericValues(e) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => saveNewFilterNumeric() }
        >
          Filtrar
        </button>
      </div>
    );
  }

  function handlerChangeName({ target }) {
    const { value } = target;
    setFilterName(value);
  }

  function setFilterNameContext() {
    setFilters(filterName);
  }
  useEffect(setFilterNameContext, [filterName]);

  const [orderFilter, setOrderFilter] = useState({ column: 'name', sort: 'ASC' });
  const [isOrdened, setIsOrdened] = useState(false);
  function saveOrderFilter({ target }) {
    const { name, value } = target;
    setOrderFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function updateContextFilterOrder() {
    addFilterByOrder(orderFilter);
    setIsOrdened(false);
  }

  function startOrder() {
    setIsOrdened(true);
  }
  useEffect(updateContextFilterOrder, [isOrdened]);

  const dataFilter = {
    handlerChangeName,
    saveOrderFilter,
    startOrder,
    filterName,
  };

  function renderTable() {
    return (
      <section>
        <Filters filters={ dataFilter } />
        <div className="filter-section">
          { renderFilterNumericValues() }
          { renderNumericFiltersApplied() }
        </div>
        <table>
          <thead>
            <HeaderTable />
          </thead>
          <tbody>
            { planets.map((planet, i) => <RowTable key={ i } planet={ planet } />) }
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <div>
      {
        isLoading
          ? <h3>carregando...</h3>
          : renderTable()
      }
    </div>
  );
}
