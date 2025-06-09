from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from mongo import db
from .code_standard_service import CodeStandard
class Project(BaseModel):
    creator: str
    project_name: str
    project_id: Optional[str] = None
    code_standard: Optional[CodeStandard] = None
    summary_violation: Optional[Dict[str, Any]] = None

async def get_all_project_overall(user: str) -> List[Project]:
    result = await db.project.find({"creator": user}).to_list()
    for item in result:
        item["_id"] = str(item["_id"])
    return list(result)

async def get_project_detail(project_name: str):
    result = await db.project_detail.find_one({"project_name": "123"})
    return result

async def add_new_project(new_project: Project):
    print(type(new_project))
    result = await db.project.insert_one(new_project)
    return str(result.inserted_id) 