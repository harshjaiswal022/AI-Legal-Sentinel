from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.protected import router as protected_router
from app.api.pdf import router as pdf_router
from app.api.ai import router as ai_router
from app.api.auth import router as auth_router
from app.core.database import connect_to_mongo, close_mongo_connection


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Modern lifespan handler replacing deprecated @app.on_event."""
    await connect_to_mongo(app)
    yield
    await close_mongo_connection(app)


app = FastAPI(
    title="LegalAI",
    description="AI-powered legal document analysis and Q&A platform",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(protected_router)
app.include_router(pdf_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {"status": "Backend running", "version": "v2.0.0"}
