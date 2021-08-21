import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Filters.css';
import logo from '../star-wars-logo.png';

export default function Filters({ filters }) {
  return (
    <div className="filter-top-section">
      <div className="filter-name-section">
        <label htmlFor="name-filter">
          Filter by name:
          <input
            type="text"
            data-testid="name-filter"
            onChange={ (e) => filters.handlerChangeName(e) }
            value={ filters.filterName }
          />
        </label>
      </div>
      <div className="filter-order-section">
        <label htmlFor="column-sort">
          Order by :
          <select
            data-testid="column-sort"
            name="column"
            onChange={ (e) => filters.saveOrderFilter(e) }
          >
            <option value="name">name</option>
            <option value="rotation_period">rotation_period</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="surface_water">surface_water</option>
            <option value="population">population</option>
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          ASC
          <input
            type="radio"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ (e) => filters.saveOrderFilter(e) }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          DESC
          <input
            type="radio"
            name="sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ (e) => filters.saveOrderFilter(e) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => filters.startOrder() }
        >
          Sort
        </button>
      </div>
      <div className="logo-section">
        <img className="logo" src={ logo } alt="logo star wars" />
        <span className="logo-planets">PLANETS</span>
      </div>

    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.shape({
    handlerChangeName: PropTypes.func,
    saveOrderFilter: PropTypes.func,
    startOrder: PropTypes.func,
    filterName: PropTypes.string,
  }).isRequired,
};
