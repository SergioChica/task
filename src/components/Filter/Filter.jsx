import React from 'react'

export const Filter = ({value1,value2,value3}) => {
  return (
    <label>
      <select name="filter" id="filter">
          <option value={value1}>Todas las tareas</option>
          <option value={value2}>Pendientes</option>
          <option value={value3}>Resueltas</option>
      </select>
    </label>
  )
}
