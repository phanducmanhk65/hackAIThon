from pydantic import BaseModel
from typing import List
from mongo import db

class ViolationType(BaseModel):
    violation_id: str
    violation_name: str
    description: str = ""
    example: str = "" 

class CodeStandard(BaseModel):
    standard_id: str
    standard_name: str 
    violation_types: List[ViolationType]

class SeverityType(BaseModel):
    type: str

async def get_all_code_standard():
    result = await db.code_standards.find().to_list()
    return result 

async def add_code_standard(new_standard: CodeStandard):
    result = await db.code_standards.insert_one(new_standard)
    return result.acknowledged