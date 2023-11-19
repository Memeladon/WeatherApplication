/*!
* Start Bootstrap - Blog Home v5.0.9 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener('DOMContentLoaded', () => {
    const weatherCard = document.getElementById('weather-card');
    let isDetailedInfoVisible = false; // Флаг для отслеживания видимости дополнительной информации

    weatherCard.addEventListener('click', async () => {
        try {
            if (!isDetailedInfoVisible) {
                const response = await fetch('/detailed-weather'); // Запрос на сервер для получения подробной информации о погоде
                const data = await response.json();

                const detailedWeatherCard = document.getElementById('detail-weather-card');
                const detailedWeatherInfo = document.createElement('div');
                detailedWeatherInfo.classList.add('card-body', 'mt-4');

                // Создание блока с подробной информацией о погоде
                const cityName = data.name;
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const detailedWeatherHTML = `
                    <h2 class="card-title h2">${cityName}</h2>
                    <p class="card-text">Температура: ${temperature}°C</p>
                    <p class="card-text">Описание: ${weatherDescription}</p>
                    <!-- Здесь можете добавить другие данные о погоде по вашему усмотрению -->
                `;
                detailedWeatherInfo.innerHTML = detailedWeatherHTML;

                // Вставка блока с подробной информацией о погоде
                detailedWeatherCard.appendChild(detailedWeatherInfo);
                isDetailedInfoVisible = true; // Установка флага видимости
            } else {
                const detailedWeatherInfo = document.querySelector('#detail-weather-card .card-body');
                detailedWeatherInfo.remove(); // Удаление блока с дополнительной информацией
                isDetailedInfoVisible = false; // Сброс флага видимости
            }
        } catch (error) {
            console.error('Ошибка при получении подробной информации о погоде', error);
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Массив с названиями месяцев на русском языке
  const months = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

  // Получение названия месяца по индексу
  const monthName = months[monthIndex];

  // Форматирование текущей даты в формат: день Месяца год
  const formattedDate = `${day} ${monthName} ${year}`;

  // Отображение текущей даты на странице
  const dateContainer = document.getElementById('current-date');
  dateContainer.textContent = formattedDate;
});


// Обработка погоды по текущей локации
document.addEventListener('DOMContentLoaded', () => {
  fetch('/weather')  // Отправка запроса на маршрут получения погоды
    .then(response => response.json())
    .then(data => {
      const weatherInfo = document.getElementById('weather-info');
      // Обновление информации о погоде на странице
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      // Логгирование данных погоды
      console.log(cityName, temperature, weatherDescription)

      // Определение пути к изображению в зависимости от погоды
    let imagePath;
    switch (weatherDescription) {
      case 'Чистое небо':
        imagePath = 'https://i.pinimg.com/originals/8e/1a/40/8e1a40df89eedc9219f6da0506701c97.gif';
        break;
      case 'Пасмурные облака':
        imagePath = 'https://i.pinimg.com/originals/7a/34/8b/7a348bf771b3e1b2a8117e1cb2a36422.gif';
        break;
      case 'Снег':
        imagePath = 'https://i.pinimg.com/originals/fa/ae/65/faae656df5906380cdd8323b4b42145a.gif';
        break;
      case 'Дождь':
        imagePath = 'https://i.pinimg.com/originals/59/6c/4c/596c4cf81977b958855ad5751bb29c72.gif'
        break;
      default:
        imagePath = 'https://i.pinimg.com/originals/4e/c4/70/4ec4704d590b44ea2957be3bc06115d7.gif';
        break;
    }

    // Вставка пути к изображению в CSS стили
    const weatherCard = document.getElementById('weather-card');
    weatherCard.style.backgroundImage = `url(${imagePath})`;

      const weatherHTML = `
      <h2 "card-title h4">${cityName}</h2>
      <p class="card-text">${temperature}°C. ${weatherDescription}</p>
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch(error => console.log(error));
});