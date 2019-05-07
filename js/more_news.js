window.addEventListener('load',function () {
    console.log(localStorage.getItem("category"));
    if (Request.category.some(checkCategory))
        Request(localStorage.getItem("category"), Request.apiKey, news_titles);
    else if (localStorage.getItem("category") === "weather") {
        // if (localStorage.getItem("language") === "us") {
        Request_weather("Washington", 1);

        // }
        // else{
        //     Request_weather("Kiev");
        // }
    }
    else if(Request.ather_category.some(checkCategory)){
        Request_ather(localStorage.getItem("category"), news_titles);
    }
})

