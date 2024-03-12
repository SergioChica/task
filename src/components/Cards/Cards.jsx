import React from 'react'
import './cards.css'


export const Cards = ({title,text, attribute}) => {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <p className='textCard'>{text}</p>
      <div className="containerButton">
        <button className='buttonCard' onClick={attribute}>Archivar</button> 
      </div>
      <button className="status"></button>
    </div>
  )
}
