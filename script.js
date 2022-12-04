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

// current temperature

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
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
