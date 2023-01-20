var cityFormEl = document.getElementById("city-form");
var cityInputEl = document.getElementById("cityInput");
var forecastContainer = document.getElementById("forecast-container");
var searchedCity = document.getElementById("searchedCity");



var formSubmit = function(event){
    event.preventDefault();

    var cityInput = cityInputEl.value.trim();

    if (cityInput) {
        getForecast(cityInput)

        forecastContainer.textContent = "";
        cityInputEl.value = "";
    }return

}

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

var displayForecast = function (list, city_name){
    if (list.length === 0){
        forecastContainer.textContent = "No results found";
        return;
}
 searchedCity.textContent = city_name;

for (var i = 0; i < list.length; i++){
     var cityTemp = list[i].main.temp;
     console.log(cityTemp);
     var cityHumidity = list[i].main.humidity;
     console.log(cityHumidity);
     var cityWind = list[i].wind.speed;
     console.log(cityWind);
     var timeForecast = list[i].dt_txt;
     console.log(timeForecast)
}
temp.textContent = "Temp: " + cityTemp + " °C";
wind.textContent = "Wind: " + cityWind + " MPH";
humidity.textContent = "Humidity: " + cityHumidity + "%";



}
cityFormEl.addEventListener("submit", formSubmit)