from fastapi import APIRouter, Body
from services.project_service import get_all_project_overall, get_project_detail as get_detail, add_new_project
from typing import Any, Dict

router = APIRouter()

@router.get("/get_all_project/{user_name}")
async def get_all_project(user_name: str):
    return await get_all_project_overall(user_name)

@router.get("/project_detail/{project_name}")
async def get_project_detail(project_name: str):
    return await get_detail(project_name=project_name)
    
@router.post("/add")
async def add_project(project: Dict = Body(...)):
    return await add_new_project(project)
    