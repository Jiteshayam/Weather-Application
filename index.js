const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")


// const APIkey = 'e2093adb868645c1c5ff10d56bf719dc'

// function renderWeatherInfo(data){
//   let temp = data?.main?.temp -273.15
//   let newPara = document.createElement('p')
//   newPara.textContent = `${temp.toFixed(2)} °C`

//   document.body.appendChild(newPara)
// }

// async function featchWeatherDetail(){
//   let lat = 15.3333;
//   let lon = 74.0833;
//   try {
//     let city = 'korba'

//   const Response  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
//   const data = await Response.json()

//   // let data1 = data.name
//   // console.log("weather data->",data1);

//   renderWeatherInfo(data)

//   }catch{

//   }

// }

// async function getCustomWeatherDetails(){

//   try{
//     let lat = 44.34;
//     let lon = 10.99;
  
//     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
//     let data = await result.json()
  
  
//     console.log(data);
//   }catch(err){
//     console.log("Error Found "+err);
//   }
// }

// function switchTab(clickedTab) {

//   apiErrorContainer.classList.remove("active");

//   if (clickedTab !== currentTab) {
//     currentTab.classList.remove("current-tab");
//     currentTab = clickedTab;
//     currentTab.classList.add("current-tab");

//     if (!searchForm.classList.contains("active")) {
//       userInfoContainer.classList.remove("active");
//       grantAccessContainer.classList.remove("active");
//       searchForm.classList.add("active");
//     } 
//     else {
//       searchForm.classList.remove("active");
//       userInfoContainer.classList.remove("active");
//       //getFromSessionStorage();
//     }

//     // console.log("Current Tab", currentTab);
//   }
// }



// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   console.log( position.coords.latitude)
//   console.log( position.coords.longitude)
// }