let locationButton = document.getElementById("location-button");
locationButton.addEventListener('click', getCurrentLocation)

// Retrieves city name once Latitude and Longitude are obtained from geolocation data
function getCityName(lat, lon) {
  let apiKey = "d501295ae4ed80273e766f727b7cd606";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  let getAPI = axios.get(apiUrl);
  getAPI.then(showCity);
  getAPI.then(getLatLon);
}

// When a city is searched, function retrieves latitude and longitutde coordinates for the city
function enterCity(event) {
  event.preventDefault();
  let citySearched = document.getElementById("city-searched").value;
  let apiKey = "d501295ae4ed80273e766f727b7cd606";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&&units=metric`;
  let getAPI = axios.get(apiUrl);
  getAPI.then(getLatLon);
  getAPI.then(showCity);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", enterCity);

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", enterCity);

// Show Current city and country - City search API
function showCity(response) {
  let displayCity = document.getElementById("display-city");
  displayCity.innerHTML = `${(response.data.name)}, ${(response.data.sys.country)}`;
}

// Function is called form enterCity() to get values for Latitude and Longitude for city searches
function getLatLon(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  showWeatherData(lat, lon);
}

//Retrives all weather data
function showWeatherData(lat, lon) {
  let apiKey = "d501295ae4ed80273e766f727b7cd606";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&&units=metric`;
  let getForecastAPI = axios.get(apiForecastUrl);
  getForecastAPI.then(showTemperature);
  getForecastAPI.then(showHighLowTemp);
  getForecastAPI.then(weatherDescription)
  getForecastAPI.then(windSpeed);
  getForecastAPI.then(precipitation);
  getForecastAPI.then(getTime);
  getForecastAPI.then(showWeatherImage);
  getForecastAPI.then(showForecast); //coded to 2nd api
}

// Change current temperature main
function showTemperature(response) {
  let temp = document.querySelector("h1");
  temp.innerHTML = `${Math.round(response.data.current.temp)}°`;
}

// Show Current day high and low temperatures
function showHighLowTemp(response) {
  let highTemp = document.getElementById("current-day-high");
  let lowTemp = document.getElementById("current-day-low");
  highTemp.innerHTML = `${Math.round(response.data.daily[0].temp.max)}°`;
  lowTemp.innerHTML =`${Math.round(response.data.daily[0].temp.min)}°`;
}
// Change current weather description and Icon
function weatherDescription(response) {
  let weatherCondition = document.getElementById("weather-description");
  weatherCondition.innerHTML = `${(response.data.current.weather[0].description)}`;

  // Use icon ID from API to assign new icons
  const idToIcon = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-showers-heavy',
    '09n': 'fas fa-cloud-showers-heavy',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog',
  }
  
  let iconId = response.data.current.weather[0].icon;
  let currentIconClass = idToIcon[iconId] || 'fas fa-ghost'
  document.getElementById("current-weather-icon").className = `${currentIconClass}`;
}

// Change current wind speed
function windSpeed(response) {
  let wind = document.getElementById("wind-speed");
  wind.innerHTML = `${(response.data.current.wind_speed)} M/S`;
}
// Change current precipitation
function precipitation(response) {
  let precip = document.getElementById("precipitation");
  precip.innerHTML = `${(response.data.current.humidity)}`;
}

// Get time for city searched and display correctly
function getTime(response) {
  let timezone = response.data.timezone_offset * 1000;
  let time = Date.now();
  let dateObject = new Date(time + timezone);
  let weekday = dateObject.toLocaleString("en-US", { weekday: "long", timeZone: `UTC` }) // Monday
  let hours = dateObject.toLocaleString("en-GB", { hour: "numeric", timeZone: `UTC` }) // 10 AM
  let ampm = (hours >= 12) ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let minutes = dateObject.toLocaleString("en-US", { minute: "numeric", timeZone: `UTC` }) // 30
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let timeDisplayed = document.getElementById("current-time");
  timeDisplayed.innerHTML = `${weekday}, ${hours}:${minutes} ${ampm}`;
}

// Changes the main weather image icon depending on current weather iconID in API
function showWeatherImage(response) {
  
  const idToWeatherImage = {
     '01d': 'src/media/undraw_nature_fun_n9lv.svg',
     '01n': 'src/media/moonlight_5ksn.svg',
     '02d': 'src/media/undraw_Weather_app_re_kcb1.svg',
     '02n': 'src/media/Dream_Monochromatic.svg',
     '03d': 'src/media/i_can_fly_7egl.svg',
     '03n': 'src/media/i_can_fly_7egl.svg',
     '04d': 'src/media/i_can_fly_7egl.svg',
     '04n': 'src/media/i_can_fly_7egl.svg',
     '09d': 'src/media/raingrey.svg',
     '09n': 'src/media/Rain_Monochromatic.svg',
     '10d': 'src/media/after_the_rain_58op.svg',
     '10n': 'src/media/after_the_rain_58op.svg',
     '11d': 'src/media/before_dawn_bqrj day.svg',
     '11n': 'src/media/before_dawn_bqrj night.svg',
     '13d': 'src/media/snow_games_ohkc.svg',
     '13n': 'src/media/undraw_decorative_friends_q2np.svg',
     '50d': 'src/media/undraw_social_distancing_2g0u.svg',
     '50n': 'src/media/undraw_social_distancing_2g0u.svg',
  }
  let currentIcon = response.data.current.weather[0].icon;
  let imageSource = idToWeatherImage[currentIcon] || 'src/media/undraw_thought_process_67my.svg';
  
  let weatherImage = document.getElementById("currentWeatherImage");
  weatherImage.setAttribute("src", `${imageSource}`);
}

//Function to display forecast for next 5 days, renders forecast using API and for loop

 function showForecast(response) {
    let forecastElement = document.querySelector(".weather-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    // Replace icon ID with new icons
   const idToClassMap = {
     '01d': 'fas fa-sun',
     '01n': 'fas fa-moon',
     '02d': 'fas fa-cloud-sun',
     '02n': 'fas fa-cloud-moon',
     '03d': 'fas fa-cloud',
     '03n': 'fas fa-cloud',
     '04d': 'fas fa-cloud',
     '04n': 'fas fa-cloud',
     '09d': 'fas fa-cloud-showers-heavy',
     '09n': 'fas fa-cloud-showers-heavy',
     '10d': 'fas fa-cloud-sun-rain',
     '10n': 'fas fa-cloud-moon-rain',
     '11d': 'fas fa-bolt',
     '11n': 'fas fa-bolt',
     '13d': 'fas fa-snowflake',
     '13n': 'fas fa-snowflake',
     '50d': 'fas fa-smog',
     '50n': 'fas fa-smog',
    }
   
    for (let index = 1; index < 6; index++) {
      forecast = response.data.daily[index];
      
      // format weekday from Unix timestamp
      let timez = forecast.dt * 1000;
      let timeNow = Date.now();
      let dateObjecttoday = new Date(timeNow + timez);
      let weekdayFormat = dateObjecttoday.toLocaleString("en-US", { weekday: "short", timeZone: `UTC` });
      
       // format icons
      let iconId = forecast.weather[0].icon;
      let iconClass = idToClassMap[iconId] || 'fas fa-ghost'
      
      // Render HTML for 5 day forecast
      forecastElement.innerHTML += `

        <div class="card forecast">
          <div class="card-body">
            <h5 class="card-title">${weekdayFormat}</h5>
            <i class="${iconClass}"></i>
            <p class="card-text"><span class="temp">${Math.round(forecast.temp.max)}° </span>/<span class="temp"> ${Math.round(forecast.temp.min)}°</span>
            </p>
          </div>
        </div>
        `;
    }
   removeHide();
 }
  
//  Removes hide class from all elements
function removeHide() {
  document.querySelector('.pageLoad').classList.remove('pageLoad');
  
  var sections = document.querySelectorAll('.hide');
  for (i = 0; i < sections.length; i++) {
    sections[i].classList.remove('hide');
  }
}

// Change temp based on slection of units

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

 function getCurrentLocation() {
  var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: Infinity,
  }

  function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getCityName(lat, lon);
  }

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
} 

getCurrentLocation();