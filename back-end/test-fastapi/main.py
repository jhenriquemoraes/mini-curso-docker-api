from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração de CORS
origins = [
    "http://localhost",  # ou a URL do seu front-end
    "http://localhost:5173",  # Se seu front-end estiver rodando na porta 3000
    "http://127.0.0.1:5173",  # Se o front-end estiver rodando com essa URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite essas origens específicas
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Conexão com MongoDB
client = AsyncIOMotorClient("mongodb://mongo-test:27017")
db = client.organizador
tarefas_collection = db.tarefas

# Modelo de dados
class Tarefa(BaseModel):
    id: int
    title: str
    description: str
    isCompleted: bool = False

# Rotas
@app.get("/tarefas", response_model=List[Tarefa])
async def listar_tarefas():
    tarefas = await tarefas_collection.find().to_list(1000)
    return tarefas

@app.post("/tarefas", response_model=Tarefa)
async def criar_tarefa(tarefa: Tarefa):
    await tarefas_collection.insert_one(tarefa.dict())
    return tarefa

@app.put("/tarefas/{id}", response_model=Tarefa)
async def atualizar_tarefa(id: int, tarefa: Tarefa):
    await tarefas_collection.update_one({"id": id}, {"$set": tarefa.dict()})
    return tarefa

@app.delete("/tarefas/{id}")
async def deletar_tarefa(id: int):
    await tarefas_collection.delete_one({"id": id})
    return {"mensagem": "Tarefa deletada com sucesso"}
