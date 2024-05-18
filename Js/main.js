const searchField = document.querySelector('.card > .search > input');
const searchBut = document.querySelector('.card > .search > .search_icon');
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = 'ab1fbce7731b929d65d8e0e329449d74';
const degree = document.querySelector('.data .degree');
const countryName = document.querySelector('.data .country');
const humidity = document.querySelector('.exstra_data .numbers .percent');
const windSpeed = document.querySelector('.wind .numbers .percent');
const weatherIcon = document.querySelector('.data > .image > img');
const errorMsg = document.querySelector('.card > .search > .error_text');

window.onload = () => {
    resetAll();
}

searchBut.addEventListener('click', () => {
    const query = searchField.value.trim();
    if (query) {
        degrees(query);
    } else {
        searchField.value = "";
    }
});

async function degrees(country) {
    try {
        const response = await fetch(`${weatherApi}${country}&appid=${apiKey}`);
        
        if (response.status === 404) {
            showError();
            return;
        }
        
        const weather = await response.json();

        errorMsg.classList.add('hidden');
        degree.innerHTML = `${Math.trunc(weather.main.temp)} °C`;
        countryName.innerHTML = weather.name;
        humidity.innerHTML = `${weather.main.humidity} %`;
        windSpeed.innerHTML = `${weather.wind.speed} km/hr`;

        const weatherMain = weather.weather[0].main;
        setWeatherIcon(weatherMain);

    } catch (error) {
        showError();
    }
}

function showError() {
    errorMsg.classList.remove('hidden');
    searchField.value = '';
    resetAll();
}

function setWeatherIcon(weatherMain) {
    const weatherIcons = {
        'Clear': '../Css/Images/clear.png',
        'Clouds': '../Css/Images/clouds.png',
        'Rain': '../Css/Images/rain.png',
        'Drizzle': '../Css/Images/drizzle.png',
        'Mist': '../Css/Images/mist.png',
        'Snow': '../Css/Images/snow.png'
    };
    weatherIcon.src = weatherIcons[weatherMain] || '';
}

function resetAll() {
    countryName.innerHTML = '-';
    degree.innerHTML = '- °C';
    humidity.innerHTML = '- %';
    windSpeed.innerHTML = '- km/hr';
}
