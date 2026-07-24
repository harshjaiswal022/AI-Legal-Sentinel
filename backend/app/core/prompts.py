import re

RISK_RULES = {
    "penalty": {
        "severity": "HIGH",
        "suggestion": "Review penalty clauses carefully. Consider negotiating caps."
    },
    "termination": {
        "severity": "HIGH",
        "suggestion": "Check termination conditions and notice periods."
    },
    "liability": {
        "severity": "HIGH",
        "suggestion": "Ensure liability is limited and clearly defined."
    },
    "indemnify": {
        "severity": "HIGH",
        "suggestion": "Indemnity clauses can create major risk. Seek legal advice."
    },
    "confidential": {
        "severity": "MEDIUM",
        "suggestion": "Verify confidentiality obligations and duration."
    },
    "non-compete": {
        "severity": "MEDIUM",
        "suggestion": "Non-compete clauses may restrict future work."
    },
    "fine": {
        "severity": "HIGH",
        "suggestion": "Check fine amounts and triggering conditions."
    },
    "breach": {
        "severity": "MEDIUM",
        "suggestion": "Understand breach definitions and remedies."
    },
    "arbitration": {
        "severity": "MEDIUM",
        "suggestion": "Arbitration clauses waive your right to court. Review carefully."
    },
    "waiver": {
        "severity": "LOW",
        "suggestion": "Understand what rights you are waiving under this clause."
    },
    "force majeure": {
        "severity": "LOW",
        "suggestion": "Check which events qualify as force majeure and what happens as a result."
    },
    "intellectual property": {
        "severity": "HIGH",
        "suggestion": "Verify ownership of IP created during or before this agreement."
    }
}


def detect_risks(text: str):
    """
    Detect legal risks using word-boundary regex to avoid false positives.
    e.g., 'fine' won't match 'define' or 'refine'.
    """
    findings = []
    text_lower = text.lower()

    for keyword, rule in RISK_RULES.items():
        # Use word boundary matching; escape special chars like 'non-compete'
        pattern = r'\b' + re.escape(keyword) + r'\b'
        if re.search(pattern, text_lower):
            findings.append({
                "keyword": keyword,
                "severity": rule["severity"],
                "message": f"Clause related to '{keyword}' detected",
                "suggestion": rule["suggestion"]
            })

    return findings


def classify_document(text: str) -> str:
    t = text.lower()

    if "non-disclosure" in t or "nda" in t:
        return "NDA (Non-Disclosure Agreement)"
    if "confidentiality agreement" in t:
        return "Confidentiality Agreement"
    if "lease" in t or "rent" in t or "tenancy" in t:
        return "Lease / Rental Agreement"
    if "employment" in t or "employee" in t:
        return "Employment Agreement"
    if "service agreement" in t or "service contract" in t:
        return "Service Agreement"
    if "partnership" in t:
        return "Partnership Agreement"
    if "agreement" in t or "contract" in t:
        return "General Agreement / Contract"

    return "Unknown Document"


def summarize_text(text: str, limit: int = 5):
    sentences = [s.strip() for s in text.split(".") if len(s.strip()) > 30]
    return ". ".join(sentences[:limit])
