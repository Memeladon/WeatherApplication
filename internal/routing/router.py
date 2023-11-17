from fastapi import APIRouter
from starlette.requests import Request
from starlette.templating import Jinja2Templates

router = APIRouter(
    # prefix='/weather',
    tags=['Weather'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory='./internal/templates')


@router.get('/')
def get_main_page(request: Request):
    return templates.TemplateResponse("index.html", {'request': request})
