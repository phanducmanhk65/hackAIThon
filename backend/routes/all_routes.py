from .project_routes import router as project_router
from .violation_routes import router as violation_router
from fastapi import APIRouter


router = APIRouter()

router.include_router(project_router, prefix="/project", tags=["project"])
router.include_router(violation_router, prefix="/violation", tags=["violation"])