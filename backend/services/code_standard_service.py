from pydantic import BaseModel
from typing import List
from mongo import db

class ViolationType(BaseModel):
    code_standard: str
    violation_id: str
    violation_name: str
    description: str = ""
    example: str = "" 

class CodeStandard(BaseModel):
    _id: str
    standard_name: str 

class SeverityType(BaseModel):
    type: str

async def get_all_code_standard():
    result = await db.code_standards.find().to_list()
    for item in result:
        item["_id"] = str(item["_id"])
    return list(result) 

async def add_code_standard(new_standard: CodeStandard):
    result = await db.code_standards.insert_one(new_standard.model_dump(by_alias=True, exclude_none=True))
    return result.acknowledged

async def get_all_violation_type(code_standard: str):
    result = await db.violation_types.find({"code_standard": code_standard}).to_list()
    for item in result:
        item["_id"] = str(item["_id"])
    return list(result) 

async def add_violation_type(violation_type: List[ViolationType]):
    result = await db.violation_types.insert_many([item.model_dump(by_alias=True, exclude_none=True) for item in violation_type])
    return result.acknowledged