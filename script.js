const apiKey = "c23ce1c3b685e0c4f5039833a31bb04e";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const loadingDiv = document.querySelector(".loading");
const errorDiv = document.querySelector(".error");

// Function to show the weather data
function showWeather(data) {
  weatherDiv.style.display = "block";
  loadingDiv.style.display = "none";
  errorDiv.style.display = "none";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

// Function to handle errors
function showError(message) {
  weatherDiv.style.display = "none";
  loadingDiv.style.display = "none";
  errorDiv.style.display = "block";
  errorDiv.innerHTML = `Error: ${message}`;
}

// Function to fetch weather data
async function checkWeather(city) {
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  weatherDiv.style.display = "none";

  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod === "404") {
      throw new Error("City not found");
    }
    showWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = ""; // Clear the search box
  } else {
    showError("Please enter a city name.");
  }
});
