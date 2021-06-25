// var weatherApiUrl = 'https://api.openweathermap.org';
var weatherApiKey = '886ce2f5216424339336fa34de58a37d'
var searchButton = document.getElementById('search-button');
var nameHistory = document.getElementById('name-history');
var weatherInfo = document.getElementById('weather-information');
weatherInfo.className = "row col-md-8"
var fiveHeader = document.createElement('div');
fiveHeader.className = "col-md-12";
var fiveTitle = document.createElement('h3');
var fiveName = document.createTextNode('5-Day Forecast: ');
fiveTitle.appendChild(fiveName);
fiveHeader.appendChild(fiveTitle);
var clearName = document.createTextNode('Clear');
var clearButton = document.createElement('button');
clearButton.className = "btn btn-secondary"
var searchBox = document.getElementById('search-box');
clearButton.appendChild(clearName);
searchBox.appendChild(clearButton);


function addCityHistory(cityname) {
    var cityHistory = getCityHistory();
    cityHistory.push(cityname)
    // adding city to local storage
    window.localStorage.setItem('cityHistory',JSON.stringify(cityHistory))
};

function getCityHistory() {
    return JSON.parse(window.localStorage.getItem('cityHistory')) || [];
}

// api call function
function getCityWeather (city) {
    // fetch api url  
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherApiKey)
    .then(response => response.json())
    .then(data => buildWeatherContent(data));
    
}
function buildWeatherContent (data) {
    console.log(data)
    var city = data.city;
    var cityname = city.name;
    var id = city.id;
    var weatherContainer = document.createElement('div');
    var list = data.list;
    console.log(cityname)
    // id: 5037649
    // name: "Minneapolis"
    // timezone: -18000


//list: Array(40)
    // clouds: {all: 83}
    // dt: 1624590000
    // dt_txt: "2021-06-25 03:00:00"
    // main:
        // humidity: 47
        // temp: 298.54
    //weather: Array(1)
        // 0:
        // description: "broken clouds"
        // icon: "04n"
        // id: 803
        // main: "Clouds"
    // wind:
        // deg: 19
        // gust: 6.34
        // speed: 2.5

        list.every((info,index) => {
            var temp = info.main.temp;
            var wind = info.wind.speed;
            var humidity = info.main.humidity;
            var datetime = info.dt_txt;
            weatherTemp = document.createTextNode("Temp: " + temp + " F");;
            wind = document.createTextNode("Wind: " + wind + " MPH");;
            humidity = document.createTextNode("Humidity: " + humidity + " %");;
            if(index === 0) {     
                UVindex = document.createTextNode("UV Index: ");;
                var title = document.createElement('h2');
                var nameAndDate = document.createTextNode(cityname + " " + datetime)
                weatherContainer.className = "col-md-12"
                title.appendChild(nameAndDate);
                weatherContainer.appendChild(title);
                weatherInfo.appendChild(weatherContainer);
                 
                buildContext(weatherTemp,weatherContainer);
                buildContext(wind, weatherContainer);
                buildContext(humidity, weatherContainer);
                buildContext(UVindex, weatherContainer);
            } else {
                if(index === 1) {
                    weatherInfo.appendChild(fiveHeader);
                }
                var nextFive = document.createElement('div')
                nextFive.className = "col-md-2 five";
                var date = document.createTextNode(datetime)
                buildContext(date,nextFive);
                buildContext(weatherTemp,nextFive);
                buildContext(wind, nextFive);
                buildContext(humidity, nextFive);
                weatherInfo.appendChild(nextFive);
                if(index === 5){
                    return false;
                }
            }
            return true;
        });
    
}
function buildContext(string,element) {
    var p = document.createElement('p');
    p.appendChild(string);
    element.appendChild(p);
}

searchButton.onclick = function(){
    var cityName = document.getElementById('city-name').value;
    console.log('cityname: ',cityName)
    if(cityName) {
        // console.log(cityName)
        getCityWeather(cityName);
        addCityHistory(cityName)
        addHistoryList(cityName)
    }
};

clearButton.onclick = function(){
    removeListHistoryElement();
    clearLocalStorageHistory();
}


function clearLocalStorageHistory () {
    window.localStorage.setItem('cityHistory','[]')
}

function addHistoryList (cityName) {
    var list = document.createElement('li');
    var listName = document.createTextNode(cityName);
    list.appendChild(listName);
    list.onclick = function(){
        getCityWeather(cityName);
    }
    nameHistory.appendChild(list);
}

function removeListHistoryElement() {
    let list = getCityHistory();
    list.forEach((data,index)=> {
        nameHistory.removeChild(nameHistory.childNodes[index]);   
    });
}

function createHistory() {
    var cityHistory = getCityHistory();
    cityHistory.forEach(cityName => {
        addHistoryList(cityName);
    });
}
createHistory();
