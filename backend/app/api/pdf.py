import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, UploadFile, File, Depends, Request, HTTPException, status
from app.core.auth_dependency import get_current_user
from app.services.pdf_engine import extract_text_from_pdf

router = APIRouter(prefix="/pdf", tags=["PDF"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_pdf(
    request: Request,
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    # Bug fix: raise proper HTTP error instead of returning a dict
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed."
        )

    unique_name = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)

    db = request.app.state.db
    await db.documents.insert_one({
        "user": current_user["email"],
        "filename": file.filename,
        "stored_as": unique_name,
        "text": extracted_text,
        "uploaded_at": datetime.now(timezone.utc).isoformat()
    })

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "text_preview": extracted_text[:500]
    }


@router.get("/list")
async def list_documents(
    request: Request,
    current_user=Depends(get_current_user)
):
    """Return all documents uploaded by the current user, newest first."""
    db = request.app.state.db
    cursor = db.documents.find(
        {"user": current_user["email"]},
        {"_id": 0, "text": 0, "stored_as": 0}  # Exclude heavy fields
    ).sort("_id", -1).limit(20)

    docs = await cursor.to_list(length=20)
    return {"documents": docs}
