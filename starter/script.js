var cityInput = document.querySelector(".city-input")
var weather = document.querySelector(".weather-input");
var searchButton = document.querySelector("#search-button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector("#forecast");
searchButton.addEventListener("click", getCityCoordinates);
// API key for openweathermap
var API_KEY = "f2eb18881281555f09869f2032b44d6c"; 

// Function to create the weather card
function createWeatherCard(cityName, weatherItem, index) {
    console.log(weatherItem, "this is the weather item")
    if(index === 0) {
        return `<div class="details">
                    <h3>${cityName} (${weatherItem.dt_txt.split("")[0]})</h3>
                    <h4>Temprature:${(weatherItem.main.temprature - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}</h4>
                </div>
                <div class="icon">
                    <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
  
//HTML for the 5 day forcast card
    } else {

        return `<div class="days-forecast"> 
                    <h3>(${weatherItem.dt_txt.split("")[0]})</h3>
                    <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                    <h4>Temprature:${(weatherItem.main.temprature - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>`;     
}}

// Function to fetch weather data
function getWeatherDetails(cityName, lat, lon) {
    var WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`; 

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
console.log(data, "this is get weather details")

        var fiveDayForcast = [data.list[0],data.list[8],data.list[16],data.list[24], data.list[32],data.list[39]]
       
//adding weather cards to the DOM
for (index = 0; index < fiveDayForcast.length; index++) {
    weatherItem = fiveDayForcast[index];
    if ((index === 0)) {
      currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index)
      );
    } else {
      weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index)
      );
    }
  }
    }).catch(() => {
        alert("An error occurred while fetching weather data.");
    });
}

// Function to handle search input
function getCityCoordinates(e){
    e.preventDefault();
    // var cityName = $(".form-input").val();
    // searchedCities.push(city);
    // localStorage.setItem("cities", JSON.stringify(searchedCities));
    // $("#searchHistory").append(`<div class="selected">${city}</div>`);
    // $(".form-input").val("");
    // getWeather(city);
}

   
    var cityName = "london"
   
    var GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    

//retreave weather information form the API's
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data, "this is get city coordinates")
        if(!data.length) return alert(`ERROR! No information found for ${cityName}`);
        var { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
        console.log(data)
    }).catch(() => {
        alert("ERROR!");
    });
    console.log(cityName)


// Function to display search history
var searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
function searchHistory() {
    $("#searchHistory").empty();
    searchedCities.forEach(city => {
        $("#searchHistory").append(`<div class="selected">${city}</div>`);
    });
// Call searchHistory function when the dashboard page loads
searchHistory();
console.log(city, "this is search history")
}
  


