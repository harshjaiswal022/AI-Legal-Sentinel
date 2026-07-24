from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


async def connect_to_mongo(app):
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    app.state.mongo_client = client
    app.state.db = client["ai_legal_sentinel"]
    print("MongoDB connected successfully")


async def close_mongo_connection(app):
    client = app.state.mongo_client
    if client:
        client.close()
