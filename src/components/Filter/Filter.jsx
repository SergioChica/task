import React from 'react'

export const Filter = ({select,value}) => {
  return (
    <label>
      <select value={value} onChange={select}>
          <option value='allTask' >Todas las tareas</option>
          <option value="pendingTask" >Pendientes</option>
          <option value='completeTask' >Resueltas</option>
      </select>
    </label>
  )
}
