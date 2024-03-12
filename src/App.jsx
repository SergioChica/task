import React, { useState, useRef } from 'react';
import { Main } from './components/Layouts/Main/Main';
import { Cards } from './components/Cards/Cards';

function App() {
  const titleRef = useRef('');
  const taskRef = useRef('');
  const [tasks, setTasks] = useState([]);
  const [taskArchive, setTaskArchive] = useState([]);
  const [filter, setFilter] = useState('all');

  let counter = useRef(1);

  const addTask = () => {
    const title = titleRef.current.value;
    const task = taskRef.current.value;
    const id = counter.current++;
    setTasks([...tasks, { id, title, task }]);
    titleRef.current.value = '';
    taskRef.current.value = '';
  };

  const addArchiveTask = (taskId) => {
    const archivedTask = tasks.find((task) => task.id === taskId);
    setTaskArchive([...taskArchive, archivedTask]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filterTasks = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'pending') {
      return !taskArchive.some((archivedTask) => archivedTask.id === task.id);
    } else if (filter === 'archived') {
      return taskArchive.some((archivedTask) => archivedTask.id === task.id);
    }
    return true;
  });

  return (
    <>
      <Main>
        <div className="containerButtonsAndInputs">
          <div className="containerButtons">
            <button className='buttons' onClick={() => filterTasks('pending')}>Ver tareas pendientes</button>
            <button className='buttons' onClick={() => filterTasks('archived')}>Ver tareas Archivadas</button>
            <button className='buttons' onClick={() => filterTasks('all')}>Ver todas las tareas</button>
          </div>
          <div className='containerInput'>
            <div className="inputs">
              <input ref={titleRef} type="text" placeholder='Ingresa el titulo' className='inputCard' />
              <textarea ref={taskRef} name="" id="" cols="30" rows="10" placeholder='Ingresa la tarea'></textarea>
            </div>
            <button onClick={addTask} className='buttonCard' >Crear Tarea</button>
          </div>
        </div>
        <div className="containerCards">
          {filteredTasks.map((task) => (
            <Cards
              key={task.id}
              title={task.title}
              text={task.task}
              attribute={() => addArchiveTask(task.id)}
            />
          ))}
        </div>
      </Main>
    </>
  );
}

export default App;