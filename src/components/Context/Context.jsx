import { createContext,useState} from 'react'

// Creamos el contexto dentro de la variable tasksContext 
export const tasksContext = createContext() 

// Creamos la funcion flecha para manejar el provider
export const TasksProvider = ({children}) => {
  
  const [tasks, setTasks] = useState([]);// Creamos el useState tasks y setTasks con un array para las tareas 
  return(
    // Creamos el provider para poder acceder al useState, con esto determinando el value como el useState tasks y setTasks para acceder a ellos desde children que seran los componentes hijos
    <tasksContext.Provider value={{tasks, setTasks}}>
      {children}
    </tasksContext.Provider>
  );
}