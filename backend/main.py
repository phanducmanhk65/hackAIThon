from fastapi import FastAPI
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from routes.all_routes import router as project_router
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=project_router)
@asynccontextmanager
async def startup_db():
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
    app.mongodb = app.mongodb_client["hackai"]

@asynccontextmanager
async def shutdown_db():
   app.mongodb_client.close()

@app.get("/")
def first_example():
  '''
     FG Example First Fast API Example 
  '''
  return {"GFG Example": "FastAPI"}