const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")

const grantAccessContainer = document.querySelector(".grant-locationContainer")
const searchForm = document.querySelector(".form-container")
const loadingscreen = document.querySelector(".loadingContainer")
const userInfoContainer = document.querySelector(".user-infoContainer")

// user data
const cityName = document.querySelector("[data-cityName]")
const countryName = document.querySelector("[data-countryIcon]")
const Desc = document.querySelector("[data-weatherDesc]")
const Icon = document.querySelector("[data-weatherIcon]")
const temp = document.querySelector("[data-temp]")
const windspeed = document.querySelector("[data-windspeed]")
const humidity = document.querySelector("[data-humidity]")
const cloud = document.querySelector("[data-cloudiness]")
const lang = document.querySelector("[mySelect]");

var nav = document.querySelector("#nav-check");

// initial need
const API_key = 'e2093adb868645c1c5ff10d56bf719dc'
let currentTab = userTab
currentTab.classList.add("current-tab")
language = 'en'

function chooseLang() {
  var i = lang.selectedIndex;
  language = lang.options[i].value;
  nav.checked = false
  if (currentTab != userTab) {
    fetchSearchWeatherInfo(searchInput.value)
  }else{
    getFromSessionStorage()
  }
}
getFromSessionStorage()

// initial get location

// switch between searchtab and user TAb
function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab")
    currentTab = clickedTab
    currentTab.classList.add("current-tab")
    errorlogo.classList.remove('active')

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active")
      grantAccessContainer.classList.remove("active")
      searchForm.classList.add("active")

    }
    else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromSessionStorage();
    }
  }
  nav.checked = false


}

userTab.addEventListener('click', () => {
  //pass the clicked tab as a parameter
  switchTab(userTab)
})

searchTab.addEventListener('click', () => {
  //pass the clicked tab as a parameter
  switchTab(searchTab)
})

// this funtion is use to store data in the local storage of your browser
function getFromSessionStorage() {
  const localCooridnates = sessionStorage.getItem('user-coordinates')
  if (!localCooridnates) {
    grantAccessContainer.classList.add('active')
  } else {
    const coordinates = JSON.parse(localCooridnates)
    fetchUserWeatherInfo(coordinates)
  }
}

const otherError=document.querySelector('[Othererror]')
const errorCod=document.querySelector('[errorCod]')
const errorMsg=document.querySelector('[errorMsg]')
// fetching weather Info from your location or the cordionated given to the funtion 
async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates
  grantAccessContainer.classList.remove('active')
  userInfoContainer.classList.remove('active')
  loadingscreen.classList.add("active")

  // API CALL
  try {
    let Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&lang=${language}`)
    const data = await Response.json()
    if (data?.cod==400 || data.cod==404){
      throw data
    }
    loadingscreen.classList.remove('active')
    userInfoContainer.classList.add('active')
    renderWeatherInfo(data)
  } catch(error) {
    loadingscreen.classList.remove('active')
    otherError.classList.add('active')
    errorCod.innerText = (error?.cod)
    errorMsg.innerText = (error?.message)
    console.log('There was an error', error);
  }
}

// This funtion is used for rendering informatin into your user Tab
function renderWeatherInfo(data) {
  cityName.textContent = data?.name
  countryName.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`
  Desc.innerText = data?.weather?.[0]?.description
  Icon.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`;
  let temperature = data?.main?.temp- 273.15
  temp.innerText = `${temperature.toFixed(2)}°C` 
  windspeed.innerText = `${data?.wind?.speed}m/s`
  humidity.innerText = `${data?.main?.humidity}%`
  cloud.innerText = `${data?.clouds?.all}%`
}

// in this funtion that ask permission to get your currrent location 
const grantAccessButton = document.querySelector('[data-grantAccess]')

grantAccessButton.addEventListener('click', () => {
  navigator.geolocation.watchPosition(showPosition,error);
})

// if geoloaction throw an error
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// function that take coordinate store in local Storage
function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  }
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates)
}

// this is a search form funtion for searching weather of a city
searchInput = document.querySelector('[data-searchInput]')
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.val === "") return

  fetchSearchWeatherInfo(searchInput.value);
})


const errorlogo = document.querySelector('[error]')
// fetcch weather using city
async function fetchSearchWeatherInfo(city) {
  if (searchInput.value === "") return
  loadingscreen.classList.add('active')
  searchForm.classList.add('active3')
  userInfoContainer.classList.remove('active')
  grantAccessContainer.classList.remove('active')
  errorlogo.classList.remove('active')
  
  try {
    const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&lang=${language}`)
    const data = await Response.json()
    if (data?.cod==404){
      throw data
    }
    userInfoContainer.classList.add('active')
    searchForm.classList.remove('active3')
    searchForm.classList.add('active2')
    loadingscreen.classList.remove('active')
    renderWeatherInfo(data)
  } catch(err){
    loadingscreen.classList.remove('active')
    console.log("Error Found",err);
    searchForm.classList.add('active4')
    errorlogo.classList.add('active')
  }
}

