
const searchBtnEl = document.getElementById("searchButton")
let searchHistoryArray;
const searchHistoryEl = document.getElementById("previous-search")
let cityName = "St. Paul"
const cityEl = document.getElementById("city")
const dateEl = document.getElementById("date")
const iconEl = document.getElementById("icon")
const tempEl = document.getElementById("temp")
const windspeedEl = document.getElementById("wind")
const humidityEl = document.getElementById("humidity")
const uvIndexEl = document.getElementById("uvIndex")
const prevSearchBox = document.getElementById("previous-search")
const previousSearches = prevSearchBox.getElementsByTagName("li")
let realCityName = ""


//the main click handler - checks user's inputted city name and starts the citySearch and querySearch functions
searchBtnEl.addEventListener("click", function () {
    cityName = document.getElementById("cityInput").value
    citySearch()
    queryAPI()
})


//The secondary click handler - turns list of past searches into search buttons
//The onclick in the <li> item generated below passes i in the argument, and then below in the function i specifies which node to pull innerText from
function searchHistoryButton(i) {
    // alert(previousSearches[i].innerText);
    cityName = previousSearches[i].innerText
    citySearch()
    queryAPI()
}


function queryAPI() {

    let lat = ""
    let lon = ""
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff";

    //below data is pulled for Open Weather API requests

    axios.get(queryURL)
        .then(function (response) {
            //first, query for today's weather (minus UV index)
            cityEl.innerText = response.data.city.name
            realCityName = response.data.city.name
            if (response.data.city.name == null) {
                realCityName = "fake"
            }
            dateEl.innerText = response.data.list[0].dt_txt.slice(5, 10) + "-2019"
            tempEl.innerText = "Temperature: " + response.data.list[0].main.temp + " ℉"
            humidityEl.innerText = "Humidity: " + response.data.list[0].main.humidity + "%"
            windspeedEl.innerText = "Windspeed: " + response.data.list[0].wind.speed + " MPH"
            const iconName = response.data.list[0].weather[0].icon
            iconEl.setAttribute("src", "./assets/images/" + iconName + ".png")
            lat = response.data.city.coord.lat
            lon = response.data.city.coord.lon

            //then, propogate results for forcasted weather
            const forecastBoxEls = document.querySelectorAll(".forecast")
            const forecastMainBoxEl = document.getElementById("forecastmainbox")
            forecastMainBoxEl.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                const forecastBoxElsI = forecastBoxEls[i]

                $(forecastMainBoxEl).append(`
                <div id="forecast1" class="forecast">
                <h4 id="temp`+ i + `">` + response.data.list[i * 8 + 7].dt_txt.slice(5, 10) + `-2019</h4>
                <img id="temp`+ i + `" src="./assets/images/` + response.data.list[i * 8 + 7].weather[0].icon + `.png" width="60px" height="60px"> 
                <p id="temp`+ i + `">Temperature: ` + response.data.list[i * 8 + 7].main.temp + ` ℉</p>
                <p id="temp`+ i + `">Humidity: ` + response.data.list[i * 8 + 7].main.humidity + `%</p>
                </div>
                `
                )
            }


            //then, take lat and lon from above to find today's UV index
            const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=dd1c6f0d66cbae457daf01f8f6dbe7ff&lat=" + lat + "&lon=" + lon + "";

            axios.get(uvQueryURL)
                .then(function (response) {
                    uvIndexEl.innerText = "UV Index: " + response.data.value
                })

        }).catch(function (error) {
            console.log(error)
        })

}


function citySearch() {

    setTimeout(function () {



        //pushing and saving searches to/from local memory for previous search list
        searchHistoryArray = JSON.parse(localStorage.getItem("history"))
        if (searchHistoryArray == null) { //if there is no local data saved, the array is made to be a blank array
            searchHistoryArray = []
        }

        //checking for duplicates in previous search list
        //if latest search isn't in the list, add to array and push whole list to html
        if (searchHistoryArray !== null) {
            const duplicateSearch = searchHistoryArray.indexOf(cityName)
            console.log(cityEl.innerText)
            if (duplicateSearch == -1 && cityEl.innerText !== null) {
                searchHistoryArray.push(CityName)
                localStorage.setItem("history", JSON.stringify(searchHistoryArray))
            }
            //if the latest search is a duplicate, do not add, simply pull existing array and do not add the dup search again
            if (duplicateSearch !== -1) {
            }
        }
        //if there are no previously saved search results, no need to search for duplicates
        if (searchHistoryArray == null) {
            searchHistoryArray.push(CityName)
            localStorage.setItem("history", JSON.stringify(searchHistoryArray))
        }
        //the search array is reversed to keep the most recent search on top
        searchHistoryArray.reverse();

        //updates search history 
        function searchHistory(i) {
            document.getElementById("previous-search").innerHTML = "";
            for (let i = 0; i < searchHistoryArray.length; i++) {
                $('#previous-search').append(`
        <li onclick="searchHistoryButton(`+ i + `)" id="prevSearchBtn` + i + `" class="previous-search-item">
        `+ searchHistoryArray[i] + `
        </li>
        `
                )

            }
        }
        searchHistory();

    }, 1010)
}



//both citySearch and queryAPI are run at page load with the default cityName value hardcoded above
citySearch()
queryAPI()






