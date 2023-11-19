import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from doc import settings
from internal.routing.router import router

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# --------- CORSMiddleware --------- #
origins = [
    "127.0.0.1:8000",
    "localhost:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ------------ Routing ------------ #
app.mount("/static", StaticFiles(directory="./internal/static"), name="static")
app.include_router(router)


# host=x.x.x.x:port
if __name__ == "__main__":
    uvicorn.run("srv:app", host="127.0.0.1", port=8000, reload=True)

