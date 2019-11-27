
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

searchBtnEl.addEventListener("click", function () {
    cityName = document.getElementById("cityInput").value
    searchHistoryButton()
    citySearch()
    queryAPI()
})





function searchHistoryButton() {
    const prevSearchBox = document.getElementById("previous-search")
    const previousSearches = prevSearchBox.querySelectorAll("#prevSearchBtn")
    // console.log(previousSearches)
    for (let i = 0; i < 10; i++) {
        const prevSearchEls = document.getElementById("prevSearchBtn"+ i +"")
        console.log(prevSearchEls)
        // prevSearchEls.addEventListener("click", function () {
        //     cityName = prevSearchEls.innerText;
        //     citySearch()
        //     queryAPI()
        // }
        // )
    }
}




function citySearch() {



    //pushing and saving searches to/from local memory for previous search list
    searchHistoryArray = JSON.parse(localStorage.getItem("history"))
    if (searchHistoryArray == null) { //if there is no local data saved, the array is made to be a blank array
        searchHistoryArray = []
    }

    //checking for duplicates in previous search list
    //if latest search isn't in the list, add to array and push whole list to html
    if (searchHistoryArray !== null) {
        const duplicateSearch = searchHistoryArray.indexOf(cityName)
        if (duplicateSearch == -1) {
            searchHistoryArray.push(cityName)
            localStorage.setItem("history", JSON.stringify(searchHistoryArray))
        }
        //if the latest search is a duplicate, do not add, simply pull existing array and do not add the dup search again
        if (duplicateSearch !== -1) {
        }
    }
    //if there are no previously saved search results, no need to search for duplicates
    if (searchHistoryArray == null) {
        searchHistoryArray.push(cityName)
        localStorage.setItem("history", JSON.stringify(searchHistoryArray))
    }
    //the search array is reversed to keep the most recent search on top
    searchHistoryArray.reverse();

    //updates search history 
    function searchHistory() {
        document.getElementById("previous-search").innerHTML = "";
        for (let i = 0; i < searchHistoryArray.length; i++) {
            $('#previous-search').append(`
        <li id="prevSearchBtn`+ i +`">
        `+ searchHistoryArray[i] + `
        </li>
        `
            )

        }
    }
    searchHistory();
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
                <h2 id="temp`+ i + `">` + response.data.list[i * 8 + 7].dt_txt.slice(5, 10) + `-2019</h2>
                <img id="temp`+ i + `" src="./assets/images/` + response.data.list[i * 8 + 7].weather[0].icon + `.png" width="60px" height="60px"> 
                <p id="temp`+ i + `">Temperature: ` + response.data.list[i * 8 + 7].main.temp + ` ℉</p>
                <p id="temp`+ i + `">Humidity: ` + response.data.list[i * 8 + 7].main.humidity + `%</p>
                </div>
                `
                )
            }


            //then, take lat and lon from above to find today's UV index
            const uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=dd1c6f0d66cbae457daf01f8f6dbe7ff&lat=" + lat + "&lon=" + lon + "";

            axios.get(uvQueryURL)
                .then(function (response) {
                    uvIndexEl.innerText = "UV Index: " + response.data.value
                })


            // console.log(response);
        }).catch(function (error) {
            console.log(error)
        })

}

searchHistoryButton()
citySearch()
queryAPI()






