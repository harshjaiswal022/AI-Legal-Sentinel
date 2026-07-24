from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def llm_analyze(text: str, language: str = "English"):
    try:
        prompt = f"""
You are an expert legal assistant.
**CRITICAL INSTRUCTION: Provide the analysis in {language}.**

Analyze the following legal document and provide:
1. A concise summary (5 bullet points) in {language}
2. Key legal risks in {language}
3. Overall risk level (LOW / MEDIUM / HIGH)

Document:
{text[:3500]}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ CURRENT GROQ MODEL
            messages=[
                {"role": "system", "content": f"You are a senior legal analyst. You must answer in {language}."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
        )

        return response.choices[0].message.content

    except Exception as e:
        # Never crash the API because of LLM
        return f"LLM unavailable: {str(e)}"

def llm_ask(question: str):
    try:
        prompt = f"""
You are a helpful, accurate, and empathetic legal assistant.
**CRITICAL INSTRUCTION: Analyze the language and style of the user's question and reply in the EXACT SAME language/style.**
- **English**: If the question is in English (e.g., "I want to start a company"), answer in **English**.
- **Hinglish**: If the question is in Hinglish (e.g., "mere ghar me chori hui hai"), answer in **Hinglish**.
- **Hindi**: If the question is in Hindi (e.g., "मेरे घर में चोरी हुई है"), answer in **Hindi**.

Do NOT mix languages unless the user does. If unsure, default to English.

Answer the following legal question clearly:
"{question}"

Disclaimer: Start or end with a clear disclaimer that this is not professional legal advice.
"""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful legal assistant who adapts to the user's language (English, Hindi, Hinglish)."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=600,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Service unavailable: {str(e)}"
