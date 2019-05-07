window.addEventListener("load", Init, false);

function Init() {
    console.log("Init");

    var loader = document.querySelectorAll('.load');

    document.querySelector('.img-sports-title').addEventListener("load", function () {
        loader[0].style.display = 'none';
    }, false);

    document.querySelector('.img-entertainment-title').addEventListener("load", function () {
        loader[1].style.display = 'none';
    }, false);

    document.querySelector('.img-health-title').addEventListener("load", function () {
        loader[2].style.display = 'none';
    }, false);

    document.querySelector('.img-science-title').addEventListener("load", function () {
        loader[3].style.display = 'none';
    }, false);

    document.querySelector('.img-technology-title').addEventListener("load", function () {
        loader[4].style.display = 'none';
    }, false);

    for (var i = 0; i < Request.category.length; i++)
        Request(Request.category[i], Request.apiKey, showNews);

    Request_exchange();
    Request_weather("Washington");

    document.querySelector(`.category_1`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[0])
    }, false);

    document.querySelector(`.category_2`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[1])
    }, false);

    document.querySelector(`.category_3`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[2])
    }, false);

    document.querySelector(`.category_4`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[3])
    }, false);

    document.querySelector(`.category_5`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[4])
    }, false);

    document.querySelector(`.category_6`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[5])
    }, false);

    document.querySelector(`.category_7`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[6])
    }, false);

    document.querySelector(`.category_8`).addEventListener("click", function () {
        localStorage.setItem("category", Request.ather_category[7])
    }, false);

    document.getElementById(Request.category[0]).addEventListener("click", function () {
        localStorage.setItem("category", Request.category[0])
    }, false);

    document.getElementById(Request.category[1]).addEventListener("click", function () {
        localStorage.setItem("category", Request.category[1])
    }, false);

    document.getElementById(Request.category[2]).addEventListener("click", function () {
        localStorage.setItem("category", Request.category[2])
    }, false);

    document.getElementById(Request.category[3]).addEventListener("click", function () {
        localStorage.setItem("category", Request.category[3])
    }, false);

    document.getElementById(Request.category[4]).addEventListener("click", function () {
        localStorage.setItem("category", Request.category[4])
    }, false);

    document.getElementById("weather").addEventListener("click", function () {
        localStorage.setItem("category", "weather")
    }, false);
}

function sportsNews(news) {
    console.log(news);
}

function showNews(Data, category) {

    var Img = document.querySelector(`.img-${category}-title`);

    Img.setAttribute('src', Data.articles[0].urlToImage);
    console.log(Data.articles[0].title);
}

showNews.name = "showNews";
