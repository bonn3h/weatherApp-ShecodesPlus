//  Show current Day and Time
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[new Date().getDay()];
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
    }
  let ampm = (hours >= 12) ? "PM" : "AM";

  let today = `${day}, ${hours}:${minutes} ${ampm}`;
  return today;
}

let currentTime = document.getElementById("current-time");
currentTime.innerHTML = formatDate();

// Search city- show city

function enterCity(event) {
  event.preventDefault();
  let citySearched = document.getElementById("city-searched").value;
  let apiKey = "d501295ae4ed80273e766f727b7cd606";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&&units=metric`;
  let getAPI = axios.get(`${apiUrl}`);
  getAPI.then(showTemperature);
  getAPI.then(showCity);
  getAPI.then(showHighLowTemp);
  getAPI.then(weatherDescription)
  getAPI.then(windSpeed);
  getAPI.then(precipitation);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", enterCity)

// Change current temperature main
function showTemperature(response) {
  let temp = document.querySelector("h1");
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
}
// Show Current city and country
function showCity(response) {
  let displayCity = document.getElementById("display-city");
  displayCity.innerHTML = `${(response.data.name)}, ${(response.data.sys.country)}`;
}
// Show Current day high and low temperatures
function showHighLowTemp(response) {
  let highTemp = document.getElementById("current-day-high");
  let lowTemp = document.getElementById("current-day-low");
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  lowTemp.innerHTML =`${Math.round(response.data.main.temp_min)}°`;
}

// Change current weather descriptiin
function weatherDescription(response) {
  let weatherCondition = document.getElementById("weather-description");
  let weatherDescribed = `${(response.data.weather[0].description)}`;
  weatherCondition.innerHTML = weatherDescribed.toUpperCase();
}
// Change current wind speed
function windSpeed(response) {
  let wind = document.getElementById("wind-speed");
  wind.innerHTML = `${(response.data.wind.speed)} M/S`;
}
// Change current precipitation
function precipitation(response) {
  let precip = document.getElementById("precipitation");
  precip.innerHTML = `${(response.data.main.humidity)}`;
}

// Bonus challenge - change temp based on slection of units

let fahrenheit = document.getElementById("fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit)

let celcius = document.getElementById("celcius-link");
celcius.addEventListener("click", changeToCelcius)


function changeToCelcius(event) {
  if (!event.target.classList.contains("active")) {
    event.preventDefault();
    let fTemp = document.querySelectorAll(".temp");
    function convertTempToC(element) {
      let temp = parseInt(element.innerText)
      let fToCel = (temp - 32) * 5 / 9;
      element.innerText = Math.round(fToCel) + `°`;
    }
    fTemp.forEach(convertTempToC)
    event.target.classList.add("active");
    fahrenheit.classList.remove("active");
  } 
}
  
function changeToFahrenheit(event) {
  if (!event.target.classList.contains("active")) {
    event.preventDefault();
    let cTemp = document.querySelectorAll(".temp");
    function convertTempToF(element) {
      let temp = parseInt(element.innerText)
      let CToFar = (temp * 9 / 5) + 32;
      element.innerText = Math.round(CToFar) + `°`;
    }
    cTemp.forEach(convertTempToF)
    event.target.classList.add("active");
    celcius.classList.remove("active");
  }
}

