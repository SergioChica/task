import { createContext,useState} from 'react'

export const tasksContext = createContext() 

export const TasksProvider = ({children}) => {
  
  const [tasks, setTasks] = useState([]);
  return(
    <tasksContext.Provider value={{ tasks, setTasks}}>
      {children}
    </tasksContext.Provider>
  );
}