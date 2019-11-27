
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
    weatherSearch()
})


function weatherSearch() {
    cityName = document.getElementById("cityInput").value


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
        <li>
        `+ searchHistoryArray[i] + `
        </li>
        `
            )

        }
    }
    searchHistory();

    // function searchHistoryButton() {
    //     const previousSearches = document.querySelectorAll('#previous-search');
    //     console.log(previousSearches)
    //     for (let i = 0; i < searchHistoryArray.length; i++) {
    //         const prevSearchEls = previousSearches[i];
    //         prevSearchEls.addEventListener("click", function(){
    //             cityName = prevSearchEls.innerHTML
    //         })

    //     }

    // }
    // searchHistoryButton()




    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff";

    axios.get(queryURL)
        .then(function (response) {
            cityEl.innerText = response.data.city.name
            dateEl.innerText = response.data.list[0].dt_txt.slice(5, 10)+"-2019"
            tempEl.innerText = response.data.list[0].main.temp+" ℉"
            humidityEl.innerText = response.data.list[0].main.humidity+"%"
            windspeedEl.innerText = response.data.list[0].wind.speed+" MPH"
            const iconName = response.data.list[0].weather[0].icon
            console.log(iconName)
            iconEl.setAttribute("src", "./assets/images/" + iconName + ".png")


            console.log(cityEl)
            console.log(response.data.city.name);
            console.log(response);

        }).catch(function (error) {
            console.log(error)
        })

}






// open weather API key: dd1c6f0d66cbae457daf01f8f6dbe7ff
// other "default" key: 12a00623f47777267b83242eca269eda
//test full url: "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff"
