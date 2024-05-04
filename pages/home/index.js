
function checkLoggedIn() {
  var loggedInEmail = localStorage.getItem('loggedInEmail');

  if (loggedInEmail) {
      document.getElementById('loggedInEmail').textContent = loggedInEmail;
  } else {
      
      window.location.href = '../login/index.html';
  }
}
document.addEventListener('DOMContentLoaded', checkLoggedIn);
function shareReaction() {
  var reactionData = "..";
  localStorage.setItem('sharedReaction', reactionData);
  window.location.href = '../reation/index.html'; 
}
document.getElementById('shareReactionBtn').addEventListener('click', shareReaction);
function logout() {   
    localStorage.removeItem('logout');
    localStorage.removeItem('loggedInEmail');
    window.location.href = '../login/index.html'; 
}



async function loadData() {
    const url =
      "https://weatherapi-com.p.rapidapi.com/forecast.json?q=phnom%20penh&days=3";
      
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b3e198fe5emsh36dbd925d853c3bp122ec5jsnf58b929daf98",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
  
      const today = result.current;
      const todayWeatherInfo = {
        date: new Date(result.location.localtime).toDateString(),
        temperature: today.temp_c,
        condition: today.condition.text,
        feelsLike: today.feelslike_c,
        humidity: today.humidity,
        windSpeed: today.wind_kph,
        uv: today.uv,
        country: result.location.country,
        zone: result.location.tz_id,
        icon: today.condition.icon,
      };
  
      document.getElementById("date").innerText = todayWeatherInfo.date;
      document.getElementById(
        "temperature"
      ).innerHTML = `<h1>${todayWeatherInfo.temperature}</h1><h5>°C</h5>`;
      document.getElementById("weather-condition").innerText =
        todayWeatherInfo.condition;
      document.getElementById("conditions").innerHTML = `
              <p>${todayWeatherInfo.feelsLike} C</p>
              <p>${todayWeatherInfo.humidity}%</p>
              <p>${todayWeatherInfo.windSpeed}</p>
              <p>${todayWeatherInfo.uv}</p>
          `;
      document.getElementById("weather-icon").src = todayWeatherInfo.icon;

      for (let i = 1; i <= 2; i++) {
        const forecast = result.forecast.forecastday[i];
        // Check if forecast data exists for the next day
        if (forecast) {
            const forecastWeatherInfo = {
                date: new Date(forecast.date).toDateString(),
                temperature: forecast.day.avgtemp_c,
                condition: forecast.day.condition.text,
                feelsLike: forecast.day.avgtemp_c,
                humidity: forecast.day.avghumidity,
                windSpeed: forecast.day.maxwind_kph,
                uv: forecast.day.uv,
                country: result.location.country,
                zone: result.location.tz_id,
                icon: forecast.day.condition.icon,
            };
    
            // Display forecast information only if available
            document.getElementById(`forecast${i}`).innerHTML = `
                <div class="left">
                    <h3>Weather</h3>
                    <div class="date">${forecastWeatherInfo.date}</div>
                    <img src="${forecastWeatherInfo.icon}" alt="" /> 
                    <div class="num"><h1>${forecastWeatherInfo.temperature}</h1><h5>°C</h5></div>
                    <p>${forecastWeatherInfo.condition}</p>
                </div>
                <div class="right">
                    <h3>Conditions</h3>
                    <div class="box-right">
                        <div class="title">
                            <p>Feels Like</p>
                            <p>Humidity</p>
                            <p>Wind (Kph)</p>
                            <p>UV</p>
                        </div>
                        <div class="number">
                            <p>${forecastWeatherInfo.feelsLike} C</p>
                            <p>${forecastWeatherInfo.humidity}%</p>
                            <p>${forecastWeatherInfo.windSpeed}</p>
                            <p>${forecastWeatherInfo.uv}</p>
                        </div>
                    </div>
                    <div class="border"></div>
                    <div class="box-right">
                        <div class="title">
                            <p>Country</p>
                            <p>Zone</p>
                        </div>
                        <div class="number">
                            <p>${forecastWeatherInfo.country}</p>
                            <p>${forecastWeatherInfo.zone}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Display a message indicating that forecast data is not available for this day
            document.getElementById(`forecast${i}`).innerHTML = `<p>No forecast data available for this day</p>`;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}

window.onload = loadData;
