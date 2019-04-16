window.onload;

window.addEventListener("load", Init);

function Init() {
    console.log("Init");
    var apiKey = "36459759fd204587b4a5d9166e8fb4b5";
    var category = ["sports", "entertainment", "health", "science", "technology"];
    var callbackFunctions = [
        {news: sportsNews},
        {news: entertainmentNews},
        {news: healthNews},
        {news: scienceNews},
        {news: technologyNews}
    ];

    for (var i = 0; i < category.length; i++)
        Request(category[i], apiKey, showNews);
    Request_exchange();
    Request_weather();
    Request_NG();
}


function Request(category, apiKey, callback) {
    var xhr = new XMLHttpRequest();
    var url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            var errStatus = xhr.status;
            var errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        }
        else {
            var Data = JSON.parse(xhr.responseText);
            callback(Data, category);
        }
    }
}

function Request_weather() {
    var xhr = new XMLHttpRequest();
    var Info = document.querySelector(".weather-info");
    var url = `http://api.apixu.com/v1/current.json?key=ad483afd9ccc4a1eae1134904191104&q=Washington`;
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            var errStatus = xhr.status;
            var errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        }
        else {
            var Data = JSON.parse(xhr.responseText);
            Info.innerHTML = `Weather in Washington:<br>
            Temp(C): ${Data.current.temp_c}<br> 
            Temp(F): ${Data.current.temp_f}<br>
            Wind direction: ${Data.current.wind_dir}<br> 
            Wind(kph): ${Data.current.wind_kph}<br>
            Wind(mph): ${Data.current.wind_mph}`;
        }
    }
}

function Request_exchange() {
    var xhr = new XMLHttpRequest();
    var Info = document.querySelector(".exchange-info");
    var url = `http://data.fixer.io/api/latest?access_key=52370a986342ee548aac7c57aa886dc6`;
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            var errStatus = xhr.status;
            var errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        }
        else {
            var Data = JSON.parse(xhr.responseText);
            sportsNews(Data);
            Info.innerHTML = `Buy CAD: ${Data.rates.CAD}<br> Buy CHF: ${Data.rates.CHF}<br>
                Buy EUR: ${Data.rates.EUR}<br> Buy GBP: ${Data.rates.GBP}<br>`;
        }
    }
}

function Request_NG(){
    var xhr = new XMLHttpRequest();
    var Info = document.querySelector(".national-geographic-content"),
        Img = document.querySelector(".img-national-geographic-title"),
        Title = document.querySelector(".title-national-geographic");
    var url = 'https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=36459759fd204587b4a5d9166e8fb4b5';
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            var errStatus = xhr.status;
            var errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        }
        else {
            var Data = JSON.parse(xhr.responseText);
            console.log("NG");
            sportsNews(Data);
            Img.setAttribute('src', Data.articles[0].urlToImage);
            Title.innerHTML = Data.articles[0].title;
            Title.setAttribute('href',Data.articles[0].url);
            Info.innerHTML = Data.articles[0].description;
        }
    }
}

function sportsNews(news) {
    console.log(news);
}

function entertainmentNews(news) {
    console.log(news);
}

function healthNews(news) {
    console.log(news);
}

function scienceNews(news) {
    console.log(news);
}

function technologyNews(news) {
    console.log(news);
}

function showNews(Data, category) {

    var Img = document.querySelector(`.img-${category}-title`),
        Title = document.querySelector(`.category-${category}`);

    Img.setAttribute('src', Data.articles[0].urlToImage);
    Title.innerHTML = Data.articles[0].title;
    Title.setAttribute('href', Data.articles[0].url);
    console.log(Data.articles[0].title);
}