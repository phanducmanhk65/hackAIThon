from fastapi import APIRouter, Body, File, Form, UploadFile
from services.project_service import Project, get_all_project_overall, get_project_detail as get_detail, add_new_project, upload_folder
from typing import Any, Dict, List

router = APIRouter()

@router.get("/get_all_project/{user_name}")
async def get_all_project(user_name: str):
    return await get_all_project_overall(user_name)

@router.get("/project_detail/{project_name}")
async def get_project_detail(project_name: str):
    return await get_detail(project_name=project_name)
    
@router.post("/add_project")
async def add_project(creator: str = Form(...), code_standard = Form(...), project_name: str = Form(...),
    files: List[UploadFile] = File(...)):
    project: Project = {"project_name": project_name, "creator": creator, "project_name": project_name, "code_standard": code_standard}
    result_1 = await add_new_project(project)
    result_2 = await upload_folder(files=files)
    return result_1 and result_2
    