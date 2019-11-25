


const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ciyName + "&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff";

axios.get("https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff")
    .then(function (response) {
        const city = document.getElementsByClassName("city")
        const wind = document.getElementsByClassName("wind")
        const humidity = document.getElementsByClassName("humity")
        const temp = document.getElementsByClassName("temp")
        console.log(response);
    });


// open weather API key: dd1c6f0d66cbae457daf01f8f6dbe7ff
// other "default" key: 12a00623f47777267b83242eca269eda