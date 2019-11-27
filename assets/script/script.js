
const searchBtnEl = document.getElementById("searchButton")
const pastSearches = []
searchBtnEl.addEventListener("click", function(){
    weatherSearch()
})


function weatherSearch (){
const cityName = document.getElementById("cityInput").value
console.log(cityName)

let currentData = localStorage.getItem("history") 
let searchHistoryArray = JSON.parse(currentData)
if (currentData == null) { //if there is no local data saved, the array is made to be a blank array
    searchHistoryArray = []
}
searchHistoryArray.push(cityName)
localStorage.setItem("history", JSON.stringify(searchHistoryArray))

const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff";

axios.get(queryURL)
    .then(function (response) {
        const cityEl = document.getElementsByClassName("city")
        const dateEl = document.getElementById("date")
        const iconEl = document.getElementById("icon")
        const tempEl = document.getElementById("temp")
        const windspeedEl = document.getElementById("wind")
        const humidity = document.getElementsByClassName("humity")
        const uvIndexEl = document.getElementsByClassName("uvIndex")
        console.log(response.data.city.name);
        console.log(response);
        
    }).catch(function (error){
        console.log(error)
    })

}

// open weather API key: dd1c6f0d66cbae457daf01f8f6dbe7ff
// other "default" key: 12a00623f47777267b83242eca269eda
//test full url: "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=dd1c6f0d66cbae457daf01f8f6dbe7ff"
