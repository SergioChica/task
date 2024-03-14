import React, { useState, useRef } from 'react';
import logoReact from '../../../assets/React-icon.png'
import { Header } from '../../Layouts/Header/Header'
import { Main } from '../../Layouts/Main/Main'
import { Footer } from '../../Layouts/Footer/Footer'
import { Filter } from '../../Filter/Filter'
import { Tasks } from '../../Tasks/Tasks'
import { ItemTaks } from '../../ItemTaks/ItemTaks'



export const Home = () => {

  const titleRef = useRef('');
  const taskRef = useRef('');
  const [tasks, setTasks] = useState([]);

  let counter = useRef(1);

  const addTask = () => {
    const title = titleRef.current.value;
    const task = taskRef.current.value;
    const id = counter.current++;
    setTasks([...tasks, { id, title, task }]);
    titleRef.current.value = '';
    taskRef.current.value = '';
  };

  return (
    <>
      <Header>
        <div className="containerHeader">
            <h2 className='titleHeader'>Lista de Tareas</h2>
            <img src={logoReact} className='imgHeader' alt="" />
        </div>
      </Header>
      <Main>
        <section className="sectionOne">
          <div className="inputs">
            <div className="containerInput">
              <p>Titulo de la tarea:</p>
              <input ref={titleRef} type="text" />
            </div>
            <div className="containerInput">
              <p>Descripcion de la tarea:</p>
              <input ref={taskRef} type="text" />
            </div>
            <button onClick={addTask} className="buttonInputs">Crear</button>
          </div>
          <p className='textCount'>Usted tiene 2 Tareas completadas y 2 tareas pendientes</p>
          <hr />
        </section>
        <section className="sectionTwo">
          <div className="containerFilter">
            <p className='textFilter'>Filtrar:</p>
            <Filter />
          </div>
          <div className="containerCard">
            <Tasks>
              {tasks.map((task) => (
                <ItemTaks
                  key={task.id}
                  title={task.title}
                  description={task.task}
                />
              ))}
            </Tasks>
          </div>
        </section>
      </Main>
      <Footer>
        <p>&copy; SergioChica</p>
      </Footer>
    </>
  )
}
