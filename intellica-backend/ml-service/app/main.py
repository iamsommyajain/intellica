from fastapi import FastAPI
from app.routes.recommendations import router as rec_router

app = FastAPI(title="Intellica ML Service")

app.include_router(rec_router, prefix="/api")
