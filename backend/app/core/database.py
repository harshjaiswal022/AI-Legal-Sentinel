from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


async def connect_to_mongo(app):
    print("Mongo URL repr:", repr(settings.MONGODB_URL))
    print("Starts with mongodb:", settings.MONGODB_URL.startswith("mongodb"))
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    app.state.mongo_client = client
    app.state.db = client["ai_legal_sentinel"]
    print("MongoDB connected successfully")


async def close_mongo_connection(app):
    client = app.state.mongo_client
    if client:
        client.close()