import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import { Main } from './components/Layouts/Main/Main'
import { Cards } from './components/Cards/Cards'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Main>
        <div className='containerInput'>
            <input type="text" placeholder='Ingresa la tarea' className='inputCard' />
            <button className='buttonCard'>Crear Tarea</button>
        </div>
        <div className="containerCards">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
        </div>
      </Main>
    </>
  )
}

export default App
