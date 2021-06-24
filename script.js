//var weatherApiUrl = 'https://api.openweathermap.org';
//var weatherApiKey = '886ce2f5216424339336fa34de58a37d'

var searchButton = document.getElementById('search-button');
var nameHistory = document.getElementById('name-history');

function addCityHistory(cityname) {
    var cityHistory = JSON.parse(window.localStorage.getItem('cityHistory')) || [];
    cityHistory.push(cityname)
    // adding city to local storage
    window.localStorage.setItem('cityHistory',JSON.stringify(cityHistory))
};

function getCityHistory() {
    return window.localStorage.getItem('cityHistory') || [];
}

searchButton.onclick = function(){
    var cityName = document.getElementById('city-name').value;
    console.log('cityname: ',cityName)
    if(cityName) {
        console.log(cityName)
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
    var cityHistory = JSON.parse(window.localStorage.getItem('cityHistory')) || [];
    console.log(nameHistory)
    cityHistory.forEach(cityName => {
        addHistoryList(cityName);
    });
}
createHistory();
