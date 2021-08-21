import React from 'react';
import '../styles/HeaderTable.css';

export default function HeaderTable() {
  return (
    <tr className="header-table-section">
      <th>name</th>
      <th>rotation_period</th>
      <th>orbital_period</th>
      <th>diameter</th>
      <th>climate</th>
      <th>gravity</th>
      <th>terrain</th>
      <th>surface_water</th>
      <th>population</th>
      <th>films</th>
      <th>created</th>
      <th>edited</th>
      <th>url</th>
    </tr>
  );
}
