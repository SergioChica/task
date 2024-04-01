import React, { useState, useRef, useContext, useEffect } from 'react';
import logoReact from '../../../assets/React-icon.png'
import { Header } from '../../Layouts/Header/Header'
import { Main } from '../../Layouts/Main/Main'
import { Footer } from '../../Layouts/Footer/Footer'
import { Filter } from '../../Filter/Filter'
import { Tasks } from '../../Tasks/Tasks'
import { ItemTaks } from '../../ItemTaks/ItemTaks'
import { tasksContext } from '../../Context/Context';

export const Home = () => {
  // Creamos los useRef para los inputs corresopondientes y Creamos useContext para las tareas
  const titleRef = useRef('');// Input de titulo 
  const taskRef = useRef('');// Input de descripcion
  const counter = useRef(1);// Counter que tendra un valor incial a 1
  const context = useContext(tasksContext); // Utlizamos la variable context donde accederemos al contexto tasksContext que tendra dentro el provider, con esto usar el useState tasks y setTasks que almacenara el objeto de las tareas
  
  // Creamos los estados conrrespondientes a sus funciones
  const [viewTask, setViewTask] = useState('allTask') // El estado viewTask y setViewTask para determinar la visibilidad de las tareas, como valor depreterminado sera allTask
  const [completedCount, setCompletedCount] = useState(0); // El estado completedCount y setCompletedCount para determinar el numero de las tareas Completas, el valor incial sera 0
  const [pendingCount, setPendingCount] = useState(0); // El estado pendingCount y setPendingCount para determinar el contador de las tareas pendientes, el valor inicial sera 0

  // Creamos la funcion flecha para agregar las tareas al estado tasks que nos da provider, esto lo hacemos obteniendo cada uno de los datos del los inputs mediante useRef, despues creamos un objeto con cada uno de los datos que tendran las tareas y finalmente enviamos estos datos hacia el estado tasks
  const addTask = () => {
    // Traemos los valores de los inputs de las tasks
    const title = titleRef.current.value; // Valor de titulo que se almacenara en la variable title
    const task = taskRef.current.value; // Valor de descripcion que se almacenara en la varible task
    const id = counter.current++; // Valor de counter autoincrementable que se almacenara en la variable id

    // Objeto para determinar los valores de las tasks
    const newTask = {
      id: id, // id tendra los datos de la variable id
      title: title, // title tendra los datos de la variable title
      description: task, // description tendara los datos de la variable task
      style: 'status', // style tendra el valor 'status'
      checked: false // checked tendra un valor booleano igual a false
    };

    // Enviamos los datos de las tasks hacia context y vaciamos los inputs
    const updatedTasks = [...context.tasks, newTask]; // Creamos la variable updatedTasks que tendra los objetos anteriores de las tasks como los nuevos que se agregaran 
    context.setTasks(updatedTasks); // Enviamos la variable updatedTasks hacia el estado dentro de context 
    titleRef.current.value = ''; // Vaciamos el input de titulo
    taskRef.current.value = '';// Vaciamos el input de descripcion
  };

  // Creamos un useEffect para controlar la cantidad de tareas pendientes y completadas
  useEffect(() => {
    const completed = context.tasks.filter(task => task.checked).length; // Variable que almacenara la cantidad de tareas completadas mediante la filtracion de las tareas que tengan un checked true(osea completada, gracias al callback que siempre esperara true para almacenarlo en la variable), con esto finalmente sacando la cantidad con .length
    const pending = context.tasks.length - completed; // Variable que almacenara la cantidad de tareas pendientes mediante la cantidad de tareas totales restandolo con la cantidad de tareas completas
    setCompletedCount(completed); // Enviamos la variable completed para dar el nuevo valor para las tareas completas
    setPendingCount(pending); // Enviamos la variable pending para dar el nuevo valor para las tareas pendientes
  }, [context.tasks]); // Creamos un indicador donde si se llega a cambiar el arreglo de tasks el efecto se tendra que volver a ejecutar 

  // Creamos la funcion para determinar el nuevo estilo de la tarea y el valor booleano de checked, ademas de gestionar la cantidad de tareas completas y pendientes
  const clickChecked = (id) => {

    // Creamos la variable updateTasks donde recorre las tareas
    const updatedTasks = context.tasks.map(task => {

      // Creamos una condicional donde verifica si el id de la task es igual al id que enviamos como parametro
      if (task.id === id) {
        const newStyle = task.style === 'status' ? 'trueStatus' : 'status'; // Creamos el nuevo estilo para la task donde cambiara a un color verde en base a el operador ternario, si el condicional status es verdadero se pondra la clase trueStatus, si no se pondra nuevamente status 
        const newChecked = !task.checked;// Creamos el nuevo checked donde este saldra como true dado que el valor inicial de cada tarea sera false por lo tanto el valor contrario de este sera true

        // Creamos una condicional para aumentar o disminuir la cantindad de tareas completas y pendientes
        if (newChecked) {
          setCompletedCount(prevCount => prevCount + 1);// Creamos una funcion flecha para aumentar el contdaor de tareas completadas
          setPendingCount(prevCount => prevCount - 1);// Creamos una funcion flecha para disminuir el contdaor de tareas pendientes
        } else {
          setCompletedCount(prevCount => prevCount - 1);// Creamos una funcion flecha para disminuir el contdaor de tareas completadas
          setPendingCount(prevCount => prevCount + 1);// Creamos una funcion flecha para aumentar el contdaor de tareas pendientes
        }
        return { ...task, checked: newChecked, style: newStyle };// Retornamos las tareas anteriores y las nuevas con los nuevos parametros asignados
      }
      return task; // Retornamos las tareas
    });
    context.setTasks(updatedTasks);// Enviamos la variable updatedTasks hacia el estado tasks de context
  };

  // Creamos la funcion flecha para filtrar las tasks segun su checked
  const filterCard = () => {

    // Creamos una codicional donde verificamos si el estado viewTask es igual a la opcion que escogimos en el select,esto se hace mediante un evento que obtenga el mensaje al cual se le hizo click y si este es igual al string se dara como cumplida. Ej: el valor incial del estado viewTask sera allTask por lo cual siempre se mostraran todas las tasks hasta que sea haya escogido otra opcion.
    if (viewTask === 'allTask') {
      return context.tasks;// Retornamos todas las tareas
    } else if (viewTask === 'pendingTask') {
      return context.tasks.filter(task => !task.checked)// Retornamos todas las tareas pendientes
    } else if (viewTask === 'completeTask') {
      return context.tasks.filter(task => task.checked)// Retornamos todas las tareas completadas
    }
  }

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
          <p className='textCount'>Usted tiene {completedCount} Tareas completadas y {pendingCount} tareas pendientes</p>
          <hr />
        </section>
        <section className="sectionTwo">
          <div className="containerFilter">
            <p className='textFilter'>Filtrar:</p>
            <Filter value={viewTask} select={e => setViewTask(e.target.value)} />
          </div>
          <div className="containerCard">
            <Tasks>
            {filterCard().map((task) => (
                  <ItemTaks
                    key={task.id}
                    id={task.id}
                    style={task.style}
                    title={task.title}
                    description={task.description}
                    status={task.checked}
                    checked={() => clickChecked(task.id)}
                  />
                ))
              }
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