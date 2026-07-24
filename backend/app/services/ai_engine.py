from app.core.prompts import detect_risks, classify_document, summarize_text
from app.services.llm_engine import llm_analyze


def analyze_legal_text(text: str, language: str = "English"):
    risks = detect_risks(text)
    confidence = min(95, 60 + len(risks) * 5)

    llm_result = llm_analyze(text, language)

    return {
        "rule_based": {
            "summary": summarize_text(text),
            "document_type": classify_document(text),
            "risk_count": len(risks),
            "confidence_score": f"{confidence}%",
            "risks": risks
        },
        "llm_analysis": llm_result
    }
