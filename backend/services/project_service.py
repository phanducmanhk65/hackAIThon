import os
import shutil
from fastapi import File, HTTPException, UploadFile
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from mongo import db
from .code_standard_service import CodeStandard, get_all_violation_type
from bson import ObjectId
import httpx

class Project(BaseModel):
    creator: str
    project_name: str
    project_id: Optional[str] = None
    code_standard: str
    summary_violation: Optional[Dict[str, Any]] = None

async def get_all_project_overall(user: str) -> List[Project]:
    result = await db.project.find({"creator": user}).to_list()
    for item in result:
        item["_id"] = str(item["_id"])
    return list(result)

async def get_project_detail(project_name: str):
    result = await db.project_detail.find_one({"project_name": project_name})
    return result

async def add_new_project(new_project: Project):
    print(type(new_project))
    result = await db.project.insert_one(new_project.model_dump(by_alias=True, exclude_none=True))
    return True, str(result.inserted_id) 

async def delete_project(project_id: str):
    result = await db.project.delete_one({"_id": ObjectId(project_id)})
    return result.acknowledged

async def upload_folder(files: List[UploadFile] = File(...)):
    upload_root = "static/uploads"
    all_file_paths = []
    for file in files:
        relative_path = file.filename  
        all_file_paths.append(relative_path)
        save_path = os.path.join(upload_root, relative_path)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    return True, os.path.commonpath(all_file_paths)

async def send_request_analyze_code(source_path: str, code_standard: str):
    try:
        list_violation_ids = []
        list_violation = await get_all_violation_type(code_standard=code_standard)
        for violation in list_violation:
            list_violation_ids.append(str(violation["violation_id"]))

        async with httpx.AsyncClient() as client: 
            response = await client.post("http://localhost:8001/analyze", json={"code_dir": source_path, "list_check_rule": list_violation_ids}) 
            response.raise_for_status()  
            return response.json()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=500, detail=f"Error from other server: {exc}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}") 