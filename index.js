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
    const humdityDisplay = document.createElement("p");
    const windSpeedDisplay = document.createElement("p");

    emojiDisplay.textContent = getEmoji(id);
    tempratureDisplay.textContent = temp;
    descriptionDisplay.textContent = description;
    humdityDisplay.textContent = `${humidity}%`;
    windSpeedDisplay.textContent = `💨${speed}`;

    emojiDisplay.classList.add("emoji");
    descriptionDisplay.classList.add("description");
    humdityDisplay.classList.add("humidity");
    windSpeedDisplay.classList.add("windSpeed");

    infoBox.appendChild(emojiDisplay);
    infoBox.appendChild(tempratureDisplay);
    infoBox.appendChild(descriptionDisplay);
    infoBox.appendChild(humdityDisplay);
    infoBox.appendChild(windSpeedDisplay);
    

}
function getEmoji(id) {
    let emoji = "";
    
    switch(id) {
        case(id >= 100 && id < 110):
            emoji = "";
    }
    return emoji;
}
function displayError(message) {
    const element = document.createElement("p");
    element.textContent = message;
    element.classList.add("error")

    infoBox.textContent = "";
    infoBox.style.display = "flex";
    infoBox.style.height = "200px";
    infoBox.appendChild(element);

}