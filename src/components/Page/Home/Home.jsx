import React, { useState, useRef, useContext } from 'react';
import logoReact from '../../../assets/React-icon.png'
import { Header } from '../../Layouts/Header/Header'
import { Main } from '../../Layouts/Main/Main'
import { Footer } from '../../Layouts/Footer/Footer'
import { Filter } from '../../Filter/Filter'
import { Tasks } from '../../Tasks/Tasks'
import { ItemTaks } from '../../ItemTaks/ItemTaks'
import { tasksContext } from '../../Context/Context';


export const Home = () => {

  const titleRef = useRef('');
  const taskRef = useRef('');
  const context = useContext(tasksContext)

  const counter = useRef(1);
  const [checked, setChecked] = useState(false);
  const [styleChecked, setStyleChecked] = useState('status');

  const addTask = () => {
    const title = titleRef.current.value;
    const task = taskRef.current.value;
    const id = counter.current++;
    const newTasks = {
    id: id, 
    title: title,
    description: task,
    state:false
    };
    let listTasks = [...context.tasks,newTasks]
    context.setTasks(listTasks)
    titleRef.current.value = '';
    taskRef.current.value = '';
  };

  const clickChecked = (id) => {
    const updatedTasks = context.tasks.map(task => {
      if (task.id === id) {
        const style = styleChecked === 'status'
        ? setStyleChecked('trueStatus')
        : setStyleChecked('status')
        return { ...task, state: !task.state, task.style:style };
      }
      return task;
    });
    context.setTasks(updatedTasks);

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
              {context.tasks.map((task) => (
                <ItemTaks
                  key={task.id}
                  id={task.id}
                  style={styleChecked}
                  title={task.title}
                  description={task.description}
                  status={checked}
                  checked={clickChecked}
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