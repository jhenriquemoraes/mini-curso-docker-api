import { ChevronRightIcon, Trash, Check, CheckCheckIcon} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"

function Task({tasks, onTaskClick, onDeleteTaskClick}){
    const navegate = useNavigate()

    function onSeeDatailsClick(task){
        const query = new URLSearchParams()
        query.set("title", task.title)
        query.set("description", task.description)
        navegate(`/task?${query.toString()}`)
    }
    return(
        <ul className="space-y-4 p-4 bg-slate-200 rounded-md shadow">
            {tasks.map((task) => (
                <li key={task.id} className="flex gap-2">

                    <button onClick={() => onTaskClick(task.id)}
                    className={`bg-slate-400 w-full text-left flex items-center gap-2 text-white p-2 rounded-md 
                        ${task.isCompleted && "line-through"}`}>
                            {task.isCompleted && <Check />}
                            {task.title}

                    </button>

                    <Button onClick={()=> onSeeDatailsClick(task)}> 
                        <ChevronRightIcon />  
                    </Button>

                    <Button onClick={()=> onDeleteTaskClick(task.id)}>
                        <Trash />
                    </Button>
                </li>
            ))}
        </ul>
    )
}
export default Task