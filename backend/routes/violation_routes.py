from fastapi import APIRouter, Body
from typing import List
from services.violation_detail_service import get_all_violation_detail_by_project, add_violation_details, ViolationDetail
router = APIRouter()

@router.get("/get_all_violation/{project_id}")
async def get_all_violation(project_id: str):
    return await get_all_violation_detail_by_project(project_id=project_id) 

@router.post("/add_violation_list")
async def get_all_violation(violation_list: List[ViolationDetail] = Body(...)):
    return await add_violation_details(violation_detail_list=violation_list) 