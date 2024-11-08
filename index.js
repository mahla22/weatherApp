const cityInput = document.querySelector(".cityName");
const searchBtn = document.querySelector(".searchBtn");
const infoBox = document.querySelector(".infoBox");
const apiKey = "81a7cd1b5ffb09292fd7109effb52f8b";


searchBtn.addEventListener("click", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city) {
       try {
        const weatherData = await getWeatherData(city);
        displayWeatherData(weatherData);
        console.log(weatherData);
       }

       catch(error) {
        displayError(error);
       }
    }
    else {
        displayError("please enter a city")
    }

})
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error("couldn't fetch data");
    }
    return await response.json();

}    
function displayWeatherData(data) {
    const {
           main: {temp, humidity},
           weather: [{id, description}],
           wind: {speed}
    } = data;
    infoBox.textContent = "";
    infoBox.style.display = "flex";

    const emojiDisplay = document.createElement("div");
    const tempratureDisplay = document.createElement("h1");
    const descriptionDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windSpeedDisplay = document.createElement("p");

    emojiDisplay.textContent = getEmoji(id);
    tempratureDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    descriptionDisplay.textContent = description;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    windSpeedDisplay.textContent = `💨${speed}`;

    emojiDisplay.classList.add("emoji");
    descriptionDisplay.classList.add("description");
    humidityDisplay.classList.add("humidity");
    windSpeedDisplay.classList.add("windSpeed");

    infoBox.appendChild(emojiDisplay);
    infoBox.appendChild(tempratureDisplay);
    infoBox.appendChild(descriptionDisplay);
    infoBox.appendChild(humidityDisplay);
    infoBox.appendChild(windSpeedDisplay);   
}
function getEmoji(id) {
    let emoji = "";
    
    switch(true) {
        case(id >= 200 && id <= 232):
            emoji = "⛈";
        case(id >= 300 && id <= 321):
            emoji = "🌨";
        case(id >= 500 && id <= 504):
            emoji = "🌦";
        case(id >= 520 && id <= 531):
            emoji = "🌨";
        case(id >= 600 && id <= 622 && id == 511):
            emoji = "❄";
        case(id >= 701  && id <= 781):
            emoji = "🌫";
        case id == 800:
            emoji = "☀";
        case id == 801:
            emoji = "🌥";
        case (id >= 802  && id <= 804):
            emoji = "☁";
    }
    return emoji;

}
function displayError(message) {
    const element = document.createElement("p");
    element.textContent = message;
    element.classList.add("error")

    infoBox.textContent = "";
    infoBox.style.display = "flex";
    infoBox.appendChild(element);
}