from fastapi import APIRouter
from starlette.requests import Request
from starlette.templating import Jinja2Templates

from doc import settings
import requests
from deep_translator import GoogleTranslator

router = APIRouter(
    # prefix='/weather',
    tags=['Weather'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory='./internal/templates')


@router.get('/')
def get_main_page(request: Request):
    return templates.TemplateResponse("index.html", {'request': request})


@router.get('/week')
def get_main_page(request: Request):
    return templates.TemplateResponse("index.html", {'request': request})


@router.get('/month')
def get_main_page(request: Request):
    return templates.TemplateResponse("index.html", {'request': request})


@router.get("/detailed-weather")
def get_details():
    # Подробные данные выведу когда пойму что так вообще к чему..
    weather_data = {
        'coord': {'lon': 40, 'lat': 45},
        'weather': [{'id': 804, 'main': 'Clouds', 'description': 'overcast clouds', 'icon': '04n'}],
        'base': 'stations',
        'main': {'temp': 10.65, 'feels_like': 10.17, 'temp_min': 10.65, 'temp_max': 10.65, 'pressure': 1002,
                 'humidity': 92, 'sea_level': 1002, 'grnd_level': 992},
        'visibility': 10000,
        'wind': {'speed': 3.89, 'deg': 124, 'gust': 7.9},
        'clouds': {'all': 100},
        'dt': 1700432270,
        'sys': {'type': 2, 'id': 2088797, 'country': 'RU', 'sunrise': 1700454224, 'sunset': 1700488055},
        'timezone': 10800,
        'id': 542415,
        'name': 'Krasnodarskiy Kray',
        'cod': 200
    }
    return weather_data


@router.get("/weather")
def get_weather():
    api_key = settings.WEATHER_API_KEY  # YOUR_API_KEY
    city = "Krasnodar, RU"  # YOUR_CITY

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()
        # Перевод данных на русский язык
        # print(weather_data)
        weather_data['main']['temp'] = round(weather_data['main']['temp'], 1)
        weather_data['name'] = GoogleTranslator(source='en', target='ru').translate(text=weather_data['name'])
        weather_data['weather'][0]['description'] = GoogleTranslator(source='en', target='ru').translate(text=weather_data['weather'][0]['description']).capitalize()
        return weather_data
    else:
        return {"error": "Failed to fetch weather data"}

