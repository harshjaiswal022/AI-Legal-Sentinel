from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

ALGORITHM = "HS256"


async def get_current_user(
    request: Request,
    token: str = Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

        db = request.app.state.db
        user = await db.users.find_one({"email": email})

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token",
        )
