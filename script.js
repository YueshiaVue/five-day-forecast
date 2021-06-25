// var weatherApiUrl = 'https://api.openweathermap.org';
var weatherApiKey = '886ce2f5216424339336fa34de58a37d'
var searchButton = document.getElementById('search-button');
var nameHistory = document.getElementById('name-history');
var weatherInfo = document.getElementById('weather-information');

function addCityHistory(cityname) {
    var cityHistory = getCityHistory();
    cityHistory.push(cityname)
    // adding city to local storage
    window.localStorage.setItem('cityHistory',JSON.stringify(cityHistory))
};

function getCityHistory() {
    return JSON.parse(window.localStorage.getItem('cityHistory')) || [];
}

function getCityWeather (city) {
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

        list.forEach((info,index) => {
            var temp = info.main.temp;
            var wind = info.wind.speed;
            var humidity = info.main.humidity;
            var datetime = info.dt_txt;
        
            if(index === 0) {
                var title = document.createElement('h2');
                var nameAndDate = document.createTextNode(cityname + " " + datetime)
                title.appendChild(nameAndDate);
                weatherContainer.appendChild(title);
                weatherInfo.appendChild(weatherContainer);
            //     weatherTemp = document.createTextNode(temp);;
            //     wind = document.createTextNode(wind);;
            //     humidity = document.createTextNode(humidity);;
            //     UVindex = document.createTextNode('');;
            }
            
        });

    
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

function clearHistory () {
    window.localStorage.setItem('cityHistory','[]')
}

function addHistoryList (cityName) {
    var list = document.createElement('li');
    var listName = document.createTextNode(cityName);
    list.appendChild(listName);
    nameHistory.appendChild(list);
}


function createHistory() {
    var cityHistory = getCityHistory();
    cityHistory.forEach(cityName => {
        addHistoryList(cityName);
    });
}
createHistory();
