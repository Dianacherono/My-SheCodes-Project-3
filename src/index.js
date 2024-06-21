function refreshWeatherPage(result) {
  let temperatureValue = document.querySelector("#temperature");
  let temperature = result.data.temperature.current;
  let cityValue = document.querySelector("#city");
  let descriptionValue = document.querySelector("#description");
  let humidityValue = document.querySelector("#humidity");
  let windSpeedValue = document.querySelector("#wind-speed");
  let timeValue = document.querySelector("#time");
  let date = new Date(result.data.time * 1000);
  let iconValue = document.querySelector("#icon");

  cityValue.innerHTML = result.data.city;
  timeValue.innerHTML = dateUpdate(date);
  descriptionValue.innerHTML = result.data.condition.description;
  humidityValue.innerHTML = `${result.data.temperature.humidity}%`;
  windSpeedValue.innerHTML = `${result.data.wind.speed}km/h`;
  temperatureValue.innerHTML = Math.round(temperature);
  iconValue.innerHTML = `<img src="${result.data.condition.icon_url}" class="weather_app_icon" />`;

  currentForecast(result.data.city);
}

function dateUpdate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function currentCity(city) {
  let apiKey = "0e436o1d84aebftf2dab3947e4a43d3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherPage);
}

function searchInputSubmission(event) {
  event.preventDefault();
  let formInput = document.querySelector("#search-input");

  currentCity(formInput.value);
}

function updateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function currentForecast(city) {
  let apiKey = "0e436o1d84aebftf2dab3947e4a43d3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(result) {
  let forecastHTML = "";

  result.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-day">
            <div class="forecast-date">${updateDay(day.time)}</div>

            <img src="${day.condition.icon_url}" class="forecast-icon" />
            <div class="forecast-temperatures">
              <div class="forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}ºC</strong>
              </div>
              <div class="current-forecast-temperature">
                ${Math.round(day.temperature.minimum)}ºC
              </div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchInputSubmission);

currentCity("Dublin");
