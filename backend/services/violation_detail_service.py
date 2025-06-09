from bson import ObjectId
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Union
from mongo import db

class FixSuggestion(BaseModel):
    fixed_code: str
    explanation: Union[None, str]
    tips: Union[None, str]

class OriginalFunction(BaseModel):
    start_line: Optional[int] = 0
    end_line: Optional[int] = 0
    code: str

class ViolationDetail(BaseModel):
    project_id: str
    file: str
    line: int
    rule_id: str
    message: str = ""
    severity: str
    function: OriginalFunction
    fix_suggestion: FixSuggestion

async def get_all_violation_detail_by_project(project_id: str):
    result = await db.violation_details.find({"project_id": project_id}).to_list()
    for item in result:
        item["_id"] = str(item["_id"]) 
    return list(result)

async def add_violation_details(violation_detail_list: List[ViolationDetail]):
    violations_to_insert = [item.model_dump(by_alias=True, exclude_none=True) for item in violation_detail_list]
    result = await db.violation_details.insert_many(violations_to_insert)
    return str(result.inserted_ids)
