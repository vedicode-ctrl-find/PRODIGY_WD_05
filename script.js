

const apiKey = "your_api_key"; // Use your API key here

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    displayWeather(data);
  } catch (error) {
    alert("An error occurred: " + error.message);
  }


}

function displayWeather(data) {
    document.getElementById('city').innerText = data.name;
    document.getElementById('temperature').innerText = Math.round(data.main.temp) + '°C';
    document.getElementById('weatherCondition').innerText = data.weather[0].main;
  
    // Get dynamic icon from API
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
    document.getElementById('weatherDescription').innerHTML = `<img src="${iconUrl}" alt="Weather Icon" style="vertical-align: middle; width: 50px;"> ${data.weather[0].description}`;
  
    document.getElementById('feels_like').innerText = Math.round(data.main.feels_like) + '°C';
    document.getElementById('humidity').innerText = data.main.humidity + '%';
    document.getElementById('windspeed').innerText = data.wind.speed + ' m/s';
    document.getElementById('visibility').innerText = (data.visibility / 1000).toFixed(1) + ' km';
  
  }
  

async function getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
        try {
          const res = await fetch(weatherUrl);
          const data = await res.json();
  
          if (data.cod !== 200) {
            alert("Unable to fetch location weather!");
            return;
          }
          document.getElementById('city').innerText = data.name;
          displayWeather(data);
        } catch (error) {
          alert("An error occurred: " + error.message);
        }
      }, error => {
        alert("Unable to retrieve your location. Please allow location access.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    
  }

  
  