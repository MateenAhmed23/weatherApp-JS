// Selecting elements

const iconElement  = document.querySelector(".weather-icon");
const tempElement  = document.querySelector(".temperature-value p");
const descElement  = document.querySelector(".temperature-description p");
const locElement  = document.querySelector(".location p");
const notiElement  = document.querySelector(".notification");


// App Data

const weather = {};


weather.temperature = {
    unit: "celcius"
}


// Constant

const KELVIN = 273;

// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notiElement.style.display = 'block';
    notiElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// Setting user location

function setPosition(position){

    // console.log(position);


    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}


function showError(error){
    notiElement.style.display = 'block';
    notiElement.innerHTML = `<p> ${error.message} </p>`;
}


// Using Api

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // console.log(api);

    fetch(api).then(function(response){
        let data = response.json();
        // console.log(data);
        return data;
    }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;

        // console.log(weather);
    }).then(function(){
        displayWeather();
    })
}



// Displaying Weather

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locElement.innerHTML = `${weather.city}, ${weather.country}`;
}


// C to F

function CtoF(temp){
    return (temp* 9/5) + 32;
}


// Clicking on temp


tempElement.addEventListener('click',function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === 'celcius'){
        let F = CtoF(weather.temperature.value);
        F = Math.floor(F);

        tempElement.innerHTML= `${F}° <span>F</span>`;
        weather.temperature.unit = "farenheit";
    }
    else{
        tempElement.innerHTML= `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celcius";
    }
})