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

Request.apiKey = "36459759fd204587b4a5d9166e8fb4b5";
Request.category = ["sports", "entertainment", "health", "science", "technology"];
Request.ather_category = ["national-geographic", "abc-news", "al-jazeera-english", "bbc-sport", "bild", "cnn", "business-insider", "fox-sports"];

function news_titles(Data, category) {
    var top_img = document.querySelector(".bg-img"), date = document.querySelector(".more_news_date"),
        liItem = document.createElement("li"), parent = document.querySelector(".parent_element_for_news"),
        pEl = document.createElement("p"), imgEl = document.createElement("img"),
        aLink = document.createElement("a"), active_liItem = document.querySelector(".news-category"),
        title = document.querySelector(".title_for_news"), main_img = document.querySelector(".main_img"),
        subtitle = document.querySelector(".subtitle"), temp = [], loader = document.querySelector('.load');

    main_img.addEventListener("load", function () {
        loader.style.display = 'none';
    }, false);

    (function () {
        (function () {
            for (var i = 0; i < category.length; i++)
                temp[i] = category[i];
        })();

        title.innerHTML = temp.join(" ");
        title.style.textTransform = "uppercase";
        subtitle.innerHTML = category + " news";
        subtitle.style.textTransform = "uppercase";
        top_img.style.backgroundImage = `url(img/bg-img/${category}.jpg)`;
    })();

    if (category !== ("weather" || "exchange")) {
        date.innerHTML = Data.articles[0].publishedAt.split('T')[0];
        active_liItem.innerHTML = category.toUpperCase();
        main_img.setAttribute('src', Data.articles[0].urlToImage);

        liItem.appendChild(aLink);

        for (var i = 0; i < Data.articles.length; i++) {
            var newNode = liItem.cloneNode(true);
            if (Data.articles[i].author != (null || undefined))
                newNode.querySelector("a").innerHTML = `${Data.articles[i].title}<br>(autor or source: ${Data.articles[i].author})`;
            else newNode.querySelector("a").innerHTML = `${Data.articles[i].title}<br>(autoror source: none)`;
            newNode.querySelector("a").setAttribute('href', Data.articles[i].url);
            newNode.querySelector("a").setAttribute('target', "_blank");
            parent.appendChild(newNode);
        }
    }
    else if (category === "weather") {
        top_img.style.backgroundImage = `url(img/bg-img/${category}.jpg)`;
        title.innerHTML = temp.join(" ");

        active_liItem.innerHTML = category.toUpperCase();

        liItem.appendChild(imgEl);
        liItem.appendChild(pEl);
        liItem.style.display = "inline-block";
        liItem.style.border = "1px solid black";
        liItem.style.textAlign = "center";
        liItem.style.margin = "1px";
        loader.style.display = 'none';

        for (var i = 0; i < Data.forecast.forecastday.length; i++) {
            var newNode = liItem.cloneNode(true);
            newNode.querySelector("img").setAttribute('src', `http:${Data.forecast.forecastday[i].day.condition.icon}`);
            newNode.querySelector("p").innerHTML = `<br>Temp (in C): ${Data.forecast.forecastday[i].day.mintemp_c} ... ${Data.forecast.forecastday[i].day.maxtemp_c}<br>`;
            parent.appendChild(newNode);
        }

        parent.style.display = "flex";
        parent.style.justifyContent = "space-around";
    }
}

news_titles.name = "news_titles";

function checkCategory(category) {
    return category === localStorage.getItem("category");
}

// Washington
function Request_weather(city, trigger = 0) {
    var xhr = new XMLHttpRequest();
    if (trigger == 0) {
        var Info = document.querySelector(".weather-info"), img = document.querySelector(".weather_img"),
            link = document.querySelector(".img_src");
    }

    var url = `http://api.apixu.com/v1/forecast.json?key=72c7f8c1b4504f47bc3134454192304&q=${city}&days=5`;
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
            console.log(Data);

            if (trigger == 0) {
                Info.innerHTML = `Weather in ${city}:<br>
            Temp(C): ${Data.current.temp_c}<br> 
            Temp(F): ${Data.current.temp_f}<br>
            Wind direction: ${Data.current.wind_dir}<br> 
            Wind(kph): ${Data.current.wind_kph}<br>
            Wind(mph): ${Data.current.wind_mph}`;

                img.setAttribute('src', `http:${Data.current.condition.icon}`);
                link.setAttribute('href', `http:${Data.current.condition.icon}`);
            }

            if (trigger == 1)
                news_titles(Data, "weather");
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

//national-geographic
function Request_ather(src, callback) {
    var xhr = new XMLHttpRequest();
    var url = `https://newsapi.org/v2/top-headlines?sources=${src}&apiKey=36459759fd204587b4a5d9166e8fb4b5`;
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
            callback(Data, src);
        }
    }
}

var mapholder;

function plotMap(lat, lon) {

    var latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height = '280px';
    mapholder.style.width = '100%';

    var myOptions = {
        center: latlon,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({
        position: latlon,
        map: map,
        title: "You are here!"
    });

    google.maps.event.addListener(map, 'click', function (e) {
        var infowindow = new google.maps.InfoWindow({
            content: '<h4>Location: ' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '<h4>'
                + '<p><a href=\'/weather/?q=' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '\'>Show Weather</a></p>'
        });
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        infowindow.open(map, marker);
    });
}

function plotHomeMap(lat, lon) {

    var latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('maphome')
    mapholder.style.height = '300px';
    mapholder.style.width = '100%';

    var myOptions = {
        center: latlon,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
    var map = new google.maps.Map(document.getElementById("maphome"), myOptions);
    var marker = new google.maps.Marker({
        position: latlon,
        map: map,
        title: "You are here!"
    });

    google.maps.event.addListener(map, 'click', function (e) {
        var infowindow = new google.maps.InfoWindow({
            content: '<h4>Location: ' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '<h4>'
                + '<p><a href=\'/weather/?q=' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '\'>Show Weather</a></p>'
        });
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        infowindow.open(map, marker);
    });
}

function searchMap(lat, lon) {

    var latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height = '600px';
    mapholder.style.width = '100%';

    var myOptions = {
        center: latlon,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);


    google.maps.event.addListener(map, 'click', function (e) {
        var infowindow = new google.maps.InfoWindow({
            content: '<h4>Location: ' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '<h4>'
                + '<p><a href=\'/weather/?q=' + e.latLng.lat().toFixed(4) + ',' + e.latLng.lng().toFixed(4) + '\'>Show Weather</a></p>'
        });
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        infowindow.open(map, marker);
    });
}