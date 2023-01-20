var cityFormEl = document.getElementById("city-form");
var cityInputEl = document.getElementById("cityInput");
var forecastContainer = document.getElementById("forecast-card");
var searchedCity = document.getElementById("searchedCity");
var today = dayjs().format("MMMM D, YYYY");

console.log(today)

var formSubmit = function(event){
    event.preventDefault();
    var cityInput = cityInputEl.value.trim();

    if (cityInput) {
        getForecast(cityInput)
        getWeatherToday(cityInput)

        // forecastContainer.textContent = "";
        // cityInputEl.value = "";
    }return

}

// Todays Weather API
var getWeatherToday = function (city_name){
    var apiUrlNow = "http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&units=metric&appid=c318abf921e0b2467383d5553bd29182";
    console.log(apiUrlNow);

    fetch(apiUrlNow, {
        method: "GET",
        
    })
    .then(function (response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);

                displayWeatherToday(data, city_name)
            });
} else {
    alert("Error: " + response.statusText);
}});


searchedCity.textContent = city_name + " (" + today + ")";
};

var displayWeatherToday = function (data){
    var todayTemp = data.main.temp
    console.log(todayTemp)
    temp.textContent = "Temp: " + todayTemp + " °C";

    var todayWind = data.wind.speed
    console.log(todayWind)
    wind.textContent = "Wind: " + todayWind + " MPH";

    var todayHumidity = data.main.humidity
    console.log(todayHumidity)
    humidity.textContent = "Humidity: " + todayHumidity + "%";
}



// 5 Day Forecart API
var getForecast = function(city_name){
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city_name + "&cnt=5&units=metric&appid=c318abf921e0b2467383d5553bd29182";
    console.log(apiUrl);

    fetch(apiUrl, {
        method: "GET",
        
    })
    .then(function (response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
               displayForecast(data.list, city_name);

          });
        } else {
            alert("Error: " + response.statusText);
        }});
        
    
};

// Display 5 Next Forecast Function
var displayForecast = function (list, city_name){
    if (list.length === 0){
        forecastContainer.textContent = "No results found";
        return;
}
searchedCity.textContent = city_name + " (" + today + ")";

for (var i = 0; i < list.length; i++){
     var cityTemp = list[i].main.temp;
     console.log(cityTemp);
     var cityHumidity = list[i].main.humidity;
     console.log(cityHumidity);
     var cityWind = list[i].wind.speed;
     console.log(cityWind);
     var timeForecast = list[i].dt_txt;
     console.log(timeForecast)

    //var date = document.getElementById("date");

    var tempEl = document.createElement("p");
    tempEl.classList = "card-text text-white";
    tempEl.textContent = "Temp: " + cityTemp + " °C";

    var windEl = document.createElement("p");
    windEl.classList = "card-text text-white";
    windEl.textContent = "Wind: " + cityWind + " MPH";

    var humidityEl = document.createElement("p");
    humidityEl.classList = "card-text text-white";
    humidityEl.textContent = "Humidity: " + cityHumidity + "%";


    forecastContainer.appendChild(tempEl);
    forecastContainer.appendChild(windEl);
    forecastContainer.appendChild(humidityEl)
}



}
cityFormEl.addEventListener("submit", formSubmit)