import { useState } from "react"
import Input from "./Input"
import Button from "./Button"


function AddTasks({onAddTaskSubmit}){
    const  [title, setTitle] = useState("")
    const  [description, setDescription] = useState("")

    return(
    <div className="space-y-4 p-4 bg-slate-200 rounded-md shadow flex flex-col">  
        <Input 
            type="text" 
            placeholder="Digite o Titulo da Tarefa" 
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            />

        <Input 
        type="text" 
        placeholder="Digite a Descrição da Tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        />

        <Button 
            onClick={() => {

                if(!title.trim() || !description.trim()){
                    return alert("Preencha o titulo e a Descrição da tarefa")
                }

                onAddTaskSubmit(title, description)
                setTitle("")
                setDescription("")
            }}
        >
            Adicionar
        </Button>
    </div>
    )
}

export default AddTasks