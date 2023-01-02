// live date

let now = new Date();

let h3 = document.querySelector("h3");
let liveTime = document.querySelector("current-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="day">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="day-temp">
                <span class="forecast-low-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                <span class="forecast-high-temp"></span> ${Math.round(
                  forecastDay.temp.max
                )}°
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(celsiusTemp);
  let autoLocation = response.data.name;

  let humidData = response.data.main.humidity;
  let speedData = Math.round(response.data.wind.speed);

  let weatherDesc = response.data.weather[0].description;

  let weatherIcon = response.data.weather[0].icon;

  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = `${temperature}`;

  let buttonLocation = document.querySelector("#city");
  buttonLocation.innerHTML = `${autoLocation}`;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = `<i class="fa-solid fa-droplet rain"></i> ${humidData}%`;

  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = `<i class="fa-solid fa-wind wind"></i> ${speedData} km/ph`;

  let desc = document.querySelector("#sky");
  desc.innerHTML = `${weatherDesc}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function showPosition(position) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#search-form");
currentLocationButton.addEventListener("click", getCurrentPosition);

// search city
function searchCity(city) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("London");
