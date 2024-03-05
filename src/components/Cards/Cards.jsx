import React from 'react'
import './cards.css'


export const Cards = (text) => {
  return (
    <div className='card'>
      <p className='textCard'>{text}</p>
    </div>
  )
}
