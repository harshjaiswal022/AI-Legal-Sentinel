import hashlib
import os
from jose import jwt
from datetime import datetime, timedelta, timezone
from app.core.config import settings

ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    salt = os.urandom(16)
    pw_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt.hex() + pw_hash.hex()

def verify_password(password: str, hashed: str) -> bool:
    try:
        salt = bytes.fromhex(hashed[:32])
        pw_hash = bytes.fromhex(hashed[32:])
        return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000) == pw_hash
    except Exception:
        try:
            # Fallback for old bcrypt hashes if bcrypt is installed (optional)
            import bcrypt
            pwd_bytes = password[:72].encode('utf-8')
            hashed_bytes = hashed.encode('utf-8')
            return bcrypt.checkpw(pwd_bytes, hashed_bytes)
        except Exception:
            return False


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    # Fix: use timezone-aware datetime (datetime.utcnow() is deprecated in Python 3.12+)
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=ALGORITHM)
