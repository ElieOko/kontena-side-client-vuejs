from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class RoleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str | None
    is_active: bool
    role: RoleRead
    created_at: datetime


class AdminUserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=6, max_length=128)
    email: str | None = None
    role: Literal["admin", "viewer"] = "admin"


class AdminUserUpdate(BaseModel):
    is_active: bool | None = None
    password: str | None = Field(default=None, min_length=6, max_length=128)
    email: str | None = None


class AdminUsersList(BaseModel):
    total: int
    items: list[UserRead]


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
