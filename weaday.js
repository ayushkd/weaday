
const apiKey = "36f031f1ea51e44def8ad5923d7145f8";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cros"
  });
  const respData = await resp.json();
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);
  const weather = document.createElement('div');
  weather.classList.add('weather');

  weather.innerHTML = `
    <h2 id="temperature">${temp.toFixed(2)}°C ${data.weather[0].main}</h2>
  `;
  
  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});

function converttemp() {
  const temperature = document.getElementById('temperature');
  const currentTemperature = temperature.textContent;
  
  if (currentTemperature.includes('C')) {
    const celsiusValue = parseFloat(currentTemperature);
    const fahrenheitValue = celsiusToFahrenheit(celsiusValue);
    temperature.textContent = `${fahrenheitValue.toFixed(2)}°F`;
  } else {
    const fahrenheitValue = parseFloat(currentTemperature);
    const celsiusValue = fahrenheitToCelsius(fahrenheitValue);
    temperature.textContent = `${celsiusValue.toFixed(2)}°C`;
  }
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

fahrenheit.addEventListener('click', () => {
  const temperature = document.getElementById('temperature');
  const currentTemperature = temperature.textContent;
  const isCelsius = currentTemperature.includes('C');
  
  if (isCelsius) {
    const celsiusValue = parseFloat(currentTemperature);
    const fahrenheitValue = celsiusToFahrenheit(celsiusValue);
    temperature.textContent = `${fahrenheitValue.toFixed(2)}°F`;
  }
});
