from fastapi import APIRouter, Depends
from app.core.auth_dependency import get_current_user

router = APIRouter(tags=["Protected"])


@router.get("/protected")
async def protected_route(current_user=Depends(get_current_user)):
    return {
        "message": "You are authorized",
        "user": current_user["email"]
    }


@router.get("/auth/me")
async def get_me(current_user=Depends(get_current_user)):
    return {
        "email": current_user["email"]
    }
