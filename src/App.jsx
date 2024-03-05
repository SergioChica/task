import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import { Main } from './components/Layouts/Main/Main'
import { Cards } from './components/Cards/Cards'




function App() {
  const myRef = useRef('')
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = myRef.current.value; // Obtiene el valor del input usando current
    setTasks([...tasks, newTask]); // Actualiza el estado de las tareas
    myRef.current.value = ''; // Limpia el input después de añadir la tarea
  };

}
  return (
    <>
      <Main>
        <div className='containerInput'>
            <input ref={myRef} type="text" placeholder='Ingresa la tarea' className='inputCard' />
            <button onClick={addTask} className='buttonCard' >Crear Tarea</button>
        </div>
        <div className="containerCards">
            {
              task.map( element => <Cards>{element}</Cards>)
            }
        </div>
      </Main>
    </>
  )

export default App
