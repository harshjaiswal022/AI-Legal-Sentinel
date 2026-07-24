from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel

from app.core.auth_dependency import get_current_user
from app.services.ai_engine import analyze_legal_text
from app.services.llm_engine import llm_ask

router = APIRouter(prefix="/ai", tags=["AI"])


class QuestionRequest(BaseModel):
    question: str


@router.get("/analyze-latest")
async def analyze_latest_pdf(
    request: Request,
    language: str = "English",
    current_user=Depends(get_current_user)
):
    db = request.app.state.db

    doc = await db.documents.find_one(
        {"user": current_user["email"]},
        sort=[("_id", -1)]
    )

    if not doc:
        return {"error": "No document found. Please upload a PDF first."}

    analysis = analyze_legal_text(doc["text"], language)

    return {
        "filename": doc["filename"],
        "uploaded_at": doc.get("uploaded_at"),
        "analysis": analysis
    }


@router.post("/ask")
async def ask_legal_question(request: QuestionRequest):
    """Public endpoint — no auth required for quick legal Q&A."""
    answer = llm_ask(request.question)
    return {"answer": answer}
