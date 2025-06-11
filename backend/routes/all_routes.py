from .project_routes import router as project_router
from .violation_routes import router as violation_router
from .code_standard_routes import router as coude_standard_router
from fastapi import APIRouter


router = APIRouter()

router.include_router(project_router, prefix="/project", tags=["project"])
router.include_router(violation_router, prefix="/violation", tags=["violation"])
router.include_router(coude_standard_router, prefix="/code_standard", tags=["code_standard"])