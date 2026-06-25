async function getWeather() {

    let city = document.getElementById("cityInput").value;

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    let apiKey = "f70adaeebe6217181e6d64a358e5c355"; // Put your OpenWeather API key here

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        document.getElementById("weatherResult").innerHTML =
        "<h3>Loading...</h3>";

        let response = await fetch(url);

        let data = await response.json();

        if(data.cod != 200){
            document.getElementById("weatherResult").innerHTML =
            "<h3>❌ City not found</h3>";
            return;
        }

        let weather = data.weather[0].main;

        // Dynamic Background

        if(weather === "Clear"){
            document.body.style.background =
            "linear-gradient(135deg,#f7971e,#ffd200)";
        }

        else if(weather === "Clouds"){
            document.body.style.background =
            "linear-gradient(135deg,#757F9A,#D7DDE8)";
        }

        else if(weather === "Rain"){
            document.body.style.background =
            "linear-gradient(135deg,#4B79A1,#283E51)";
        }

        else if(weather === "Thunderstorm"){
            document.body.style.background =
            "linear-gradient(135deg,#232526,#414345)";
        }

        else if(weather === "Snow"){
            document.body.style.background =
            "linear-gradient(135deg,#E6DADA,#274046)";
        }

        document.getElementById("weatherResult").innerHTML = `

        <div class="city">${data.name}</div>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

        <div class="temp">${Math.round(data.main.temp)}°C</div>

        <div class="description">
            ${data.weather[0].description}
        </div>

        <div class="info">

            <div class="card">
                <h3>💧 Humidity</h3>
                <p>${data.main.humidity}%</p>
            </div>

            <div class="card">
                <h3>💨 Wind</h3>
                <p>${data.wind.speed} m/s</p>
            </div>

        </div>

        `;
    }

    catch(error){
        document.getElementById("weatherResult").innerHTML =
        "<h3>⚠️ Error fetching weather data</h3>";

        console.log(error);
    }
}

// Dark Mode

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Search using Enter Key

document.getElementById("cityInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});