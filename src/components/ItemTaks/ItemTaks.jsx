import React from 'react'

export const ItemTaks = ({style,title,description,status,checked}) => {
  return (
    <>
    <li>
      <div className={style}></div>
      <div className="containerTextCard">
        <p className='titleTask'>{title}:</p>  
        <p className='describeTask'>{description}</p>  
      </div>
      <input type="checkbox" checked={status} onChange={checked} id="" className='checkbox' />
    </li>
    </>
  )
}
