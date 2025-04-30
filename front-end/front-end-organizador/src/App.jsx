import { useEffect, useState } from "react"
import AddTasks from "./components/AddTask"
import Task from "./components/Tasks"
import Title from "./components/Title"

function App(){
  const [tasks, setTasks] = useState(
      JSON.parse(localStorage.getItem("tasks")) || []
    )

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const fetchTasks = async () => {
      // CHAMAR A API
      const response = await fetch(
        'http://127.0.0.1:8000/tarefas',
        {
          method: "GET",
        }
      )

      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json()
      console.log('tarefas recebidas:', data)

      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data)
    }
    fetchTasks()
  }, [])

  async function onTaskClick(taskId){
    const taskToUpdate = tasks.find(task => task.id === taskId);
  
    const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted };
  
    await fetch(`http://127.0.0.1:8000/tarefas/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
  
    const newTasks = tasks.map(task =>
      task.id === taskId ? updatedTask : task
    );
  
    setTasks(newTasks);
  }
  
  async function onDeleteTaskClick(taskId){
    await fetch(`http://127.0.0.1:8000/tarefas/${taskId}`, {
      method: 'DELETE',
    });

    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  async function onAddTaskSubmit(title, description){
    const newTask = {
      id: tasks.length + 1,  // Pode ajustar conforme o comportamento do banco de dados
      title,
      description,
      isCompleted: false,
    }

    const response = await fetch('http://127.0.0.1:8000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })

    const createdTask = await response.json();
  
    setTasks([...tasks, createdTask]);
  }

  return(
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">

      <div className="w-[500px] space-y-4"> 
  
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit}/>
        <Task tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
  
      </div> 

    </div>
  )
}

export default App
