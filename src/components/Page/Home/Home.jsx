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
  const context = useContext(tasksContext); // utlizamos la variable context como contenedor de provider
  
  // Creamos los estados conrrespondientes a sus funciones
  const [viewTask, setViewTask] = useState('allTask') // El estado para determinar la visibilidad de las cartas, como valor depreterminado sera allTask
  const [completedCount, setCompletedCount] = useState(0); // El estado para determinar el contador de las cartas Completas, el valor incial sera 0
  const [pendingCount, setPendingCount] = useState(0); // El estado para determinar el contador de las cartas pendientes, el valor inicial sera 0

  // Creamos la funcion para agregar las tasks al array de que nos da provider
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
      checked: false // checked tendra un valor valor booleano igual a false
    };

    // Enviamos los datos de las tasks hacia context y vaciamos los inputs
    const updatedTasks = [...context.tasks, newTask]; // Creamos la variable que tendra los objetos anteriores de las tasks como los nuevos que se agregaran 
    context.setTasks(updatedTasks); // Enviamos la variable que creamos anteriormente hacia el estado de dentro de context 
    titleRef.current.value = ''; // Vaciamos el input de titulo
    taskRef.current.value = '';// Vaciamos el input de descripcion
  };

  // Creamos un useEffect para controlar la cantidad de tareas pendientes y completadas
  useEffect(() => {
    const completed = context.tasks.filter(task => task.checked).length; // Variable que almacenara la cantidad de tasks completadas mediante la filtracion de las tareas que tengan un checked true(osea completada) con estas sacando la cantidad con .length
    const pending = context.tasks.length - completed; // Variable que almacenara la cantidad de tasks pendientes mediante la cantidad de tareas totales restandolo con la cantidad de tareas completas
    setCompletedCount(completed); // Enviamos la variable completed para dar el nuevo valor para las tareas completas
    setPendingCount(pending); // Enviamos la variable pending para dar el nuevo valor para las tareas pendientes
  }, [context.tasks]); // Creamos un indicador que si se llega a cambiar el arreglo de tasks el efecto se tendra que volver a ejecutar 

  // Creamos la funcion para determinar el nuevo estilo de la tasks y el valor booleano de checked, ademas de gestionar la cantidad de tareas completas y pendientes
  const clickChecked = (id) => {

    // Creamos la variable updateTasks donde recorre las tasks
    const updatedTasks = context.tasks.map(task => {

      // Creamos una condicional donde verifica si el id de la task es igual al id que enviamos como parametro
      if (task.id === id) {
        const newStyle = task.style === 'status' ? 'trueStatus' : 'status'; // Creamos el nuevo estilo para la task donde cambiara a un color verde si se cumple con la funcion 
        const newChecked = !task.checked;// Creamos el nuevo checked donde este saldra como true

        // Creamos una condicional para aumentar o disminuir la cantindad de tasks completas y pendientes
        if (newChecked) {
          setCompletedCount(prevCount => prevCount + 1);// Creamos una funcion flecha para aumentar el contdaor de tasks completadas
          setPendingCount(prevCount => prevCount - 1);// Creamos una funcion flecha para disminuir el contdaor de tasks pendientes
        } else {
          setCompletedCount(prevCount => prevCount - 1);// Creamos una funcion flecha para disminuir el contdaor de tasks completadas
          setPendingCount(prevCount => prevCount + 1);// Creamos una funcion flecha para aumentar el contdaor de tasks pendientes
        }
        return { ...task, checked: newChecked, style: newStyle };// Retornamos las tareas anteriores y las nuevas con los nuevos parametros asignados
      }
      return task; // Retornamos las tasks
    });
    context.setTasks(updatedTasks);// Enviamos la variable updatedTasks hacia el estado de context
  };

  // Creamos la funcion flecha para filtrar las tasks segun su checked
  const filterCard = () => {

    // Creamos un codicional donde verifiquemos si el estado para ver las tareas es igual ala opcion que escogimos en el select,esto se hace mediante un evento que obtenga el mensaje al cual se le hizo click y si este es igual al string se dara como cumplida. Ej: el valor incial sera allTask por lo cual siempre se mostraran todas las tasks.
    if (viewTask === 'allTask') {
      return context.tasks;// Retornamos todas las tasks
    } else if (viewTask === 'pendingTask') {
      return context.tasks.filter(task => !task.checked)// Retornamos todas las tasks pendientes
    } else if (viewTask === 'completeTask') {
      return context.tasks.filter(task => task.checked)// Retornamos todas las tasks completadas
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