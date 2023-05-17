const apiKey = "7ab5229d7cc74cf4bbc175639231605";
const searchBar = document.getElementById("searchTerm");
const searchButton = document.getElementById("searchButton");
const weatherDataDiv = document.getElementById("weatherDataDiv");

function search(event) {
  if (event.key === "Enter" || event.type === "click") {
    let searchValue = searchBar.value;
    return searchValue;
  }
}

async function fetchData(city) {
  const apiCallCity = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  try {
    const response = await fetch(apiCallCity);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("An error occurred while retrieving weather data:", error);
    return null;
  }
}

function displayWeatherData(weatherData) {
  const city = weatherData.location.name;
  const country = weatherData.location.country;
  const location = weatherData.location.tz_id;
  const temperature = weatherData.current.temp_c;
  const condition = weatherData.current.condition.text;

  const html = `
    <h1 class="city">${city}</h1>  
    <p class="country"> ${country}</p>
    <p class="temp">${temperature}°C</p>
    <p class="location">Location: ${location}</p>
    <p class="condition">Current conditions: ${condition}</p>
  `;

  weatherDataDiv.innerHTML = html;
}

searchBar.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city = search(event);
    if (city) {
      const weatherData = await fetchData(city);
      if (weatherData) {
        displayWeatherData(weatherData);
      }
    }
  }
});

searchButton.addEventListener("click", async function (event) {
  let city = search(event);
  if (city) {
    const weatherData = await fetchData(city);
    if (weatherData) {
      displayWeatherData(weatherData);
    }
  }
});
window.addEventListener("load", async () => {
  const sarajevoData = await fetchData("Sarajevo");
  displayWeatherData(sarajevoData);
});
