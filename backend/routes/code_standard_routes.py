from fastapi import APIRouter, Body
from typing import List
from services.code_standard_service import ViolationType, CodeStandard, get_all_code_standard as get_all_standard, get_all_violation_type as get_all_violation, add_code_standard, add_violation_type

router = APIRouter()

@router.get("/get_all_code_standard")
async def get_all_code_standard():
    return await get_all_standard()

@router.get("/get_all_violation_type/{code_standard}")
async def get_all_violation_type(code_standard: str):
    return await get_all_violation(code_standard)

@router.post("/add_standard")
async def add_new_code_standard(new_standard: CodeStandard = Body(...)):
    return await add_code_standard(new_standard)

@router.post("/add_new_violation_types")
async def add_new_violation_type(new_violation_types: List[ViolationType] = Body(...)):
    return await add_violation_type(new_violation_types)