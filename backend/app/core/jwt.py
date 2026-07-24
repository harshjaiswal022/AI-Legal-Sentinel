from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings

# JWT configuration
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict) -> str:
    """
    Create a JWT access token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=ALGORITHM
    )
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Decode and validate a JWT access token
    """
    payload = jwt.decode(
        token,
        settings.JWT_SECRET,
        algorithms=[ALGORITHM]
    )
    return payload
