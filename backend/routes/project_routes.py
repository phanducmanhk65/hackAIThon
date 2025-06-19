from fastapi import APIRouter, Body, File, Form, UploadFile
from services.project_service import Project, delete_project, get_all_project_overall, get_project_detail as get_detail, add_new_project, upload_folder, send_request_analyze_code
from services.violation_detail_service import ViolationDetail, add_violation_details, OriginalFunction
from typing import Any, Dict, List
import logging
router = APIRouter()

@router.get("/get_all_project/{user_name}")
async def get_all_project(user_name: str):
    return await get_all_project_overall(user_name)

@router.get("/project_detail/{project_name}")
async def get_project_detail(project_name: str):
    return await get_detail(project_name=project_name)

@router.delete("/{project_id}")
async def delete_project_route(project_id: str):
    return await delete_project(project_id=project_id)
    
@router.post("/add_project")
async def add_project(creator: str = Form(...), code_standard = Form(...), project_name: str = Form(...),
    files: List[UploadFile] = File(...)):
    project =  Project(project_name=project_name, creator=creator, code_standard=code_standard)
    result_1, project_id = await add_new_project(project)
    result_2, source_path = await upload_folder(files=files)
    if (result_1 and result_2):
        send_analyze_result = await send_request_analyze_code(source_path=source_path, code_standard=code_standard)
        list_violation_detail_to_save: List[ViolationDetail] = []
        for item in send_analyze_result["list_violations"]:
            new_item = {
                "file": item["file"],
                "line": item["line"],
                "rule_id": item["rule_id"],
                "message": item["message"],
                "severity": item["severity"],
                "function": OriginalFunction(
                    start_line=item["function"]["start_line"],
                    end_line=item["function"]["end_line"],
                    code = item["function"]["code"]
                ),
                "fix_suggestion": item["fix_suggestion"],
            }
            violation_detail = ViolationDetail(project_id=project_id, **new_item)
            list_violation_detail_to_save.append(violation_detail)
        result = await add_violation_details(list_violation_detail_to_save)
        # result = True
        return result                  
    return False
        