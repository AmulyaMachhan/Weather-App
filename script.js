const apiKey = 'e84f9ef6ac0419a3d25a515bd4c30370'
async function fetchWeatherData(city){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if(!response.ok){
            alert('Site not working');
            throw new error('Unable to fetch city data');
        }
        let data =  await response.json();
        
        updateWeatherUI(data);
    }catch(err){
        console.error(err)
        alert('Site not working');
    }
}


const cityName = document.querySelector('.city');

const desc = document.querySelector('.description-text');
const descriptionIcon = document.querySelector(".description i");

const temparature = document.querySelector('.temp');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const visibility = document.querySelector('.visibility-distance');
const date = document.querySelector('.date')

function updateWeatherUI(data){
    cityName.textContent = data.name;
    desc.textContent = data.weather[0].main;
    temparature.textContent = Math.floor(data.main.temp);
    windSpeed.textContent = data.wind.speed+'Km/h';
    humidity.textContent = data.main.humidity;
    visibility.textContent = data.visibility/1000+'Km';

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const form = document.querySelector('.search-form');
const inputElement = document.querySelector('.city-input');

form.addEventListener('submit' , function(e){
    e.preventDefault();

    let city = inputElement.value;
    if(city !== ''){
        fetchWeatherData(city);
        city = '';
    }
})

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}