class Weather {
    lat;
    lon;
    city;

    constructor(cityName) {}

    async getWeather(cityName) {
        try {
            const geoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=df9c74ff1a47dcb48aab814fa5500429`
            );
            if (!geoResponse.ok) {
                throw new Error(geoResponse.status);
            }

            const geoData = await geoResponse.json();
            this.lat = geoData[0].lat;
            this.lon = geoData[0].lon;
            this.city = geoData[0].local_names.uk;

            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&exclude=dayli&appid=df9c74ff1a47dcb48aab814fa5500429&units=metric&lang=uk`
            );
            if (!weatherResponse.ok) {
                throw new Error(weatherResponse.status);
            }

            const weatherData = await weatherResponse.json();

            document.querySelector("#weather-img").src =
                "./assets/img/png/" +
                weatherData.weather[0].icon +
                ".png";
  
            let wTemp = document.querySelector("#w-temp");
            wTemp.innerHTML = `${weatherData.main.temp.toFixed(0)} &degC`;

            let wFeel = document.querySelector("#w-feel");
            wFeel.innerHTML = `${weatherData.main.feels_like.toFixed(0)} &degC`;

            let wDesc = document.querySelector("#w-desc");
            wDesc.innerHTML = `${weatherData.weather[0].description}`;

            let wHum = document.querySelector("#w-hum");
            wHum.innerHTML = `${weatherData.main.humidity} %`;

            let wPress = document.querySelector("#w-press");
            wPress.innerHTML = `${weatherData.main.pressure} hPa`;

            let wClouds = document.querySelector("#w-clouds");
            wClouds.innerHTML = `${weatherData.clouds.all} %</p>`;

            let wSpeed = document.querySelector("#w-speed");
            wSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)} м./с.</p>`;

            let wGust = document.querySelector("#w-gust");
            wGust.innerHTML = `${weatherData.wind.gust.toFixed(1)} м./с.</p>`;

            let wDeg = document.querySelector("#w-deg");
            let windDeg = weatherData.wind.deg;

            let wDegtext;
            if (windDeg >= 1 && windDeg <= 44) {
                wDegtext = "С/СB (" + windDeg + "&deg)"
            } else if (windDeg == 45) {
                wDegtext = "С/В (" + windDeg + "&deg)"
            } else if (windDeg >= 46 && windDeg <= 89) {
                wDegtext = "В/СВ (" + windDeg + "&deg)"
            } else if (windDeg == 90) {
                wDegtext = "В(" + windDeg + "&deg)"
            } else if (windDeg >= 91 && windDeg <= 134) {
                wDegtext = "В/ЮВ (" + windDeg + "&deg)"
            } else if (windDeg == 135) {
                wDegtext = "ЮВ (" + windDeg + "&deg)"
            } else if (windDeg >= 136 && windDeg <= 179) {
                wDegtext = "Ю/ЮВ (" + windDeg + "&deg)"
            } else if (windDeg == 180) {
                wDegtext = "Ю(" + windDeg + "&deg)"
            } else if (windDeg >= 181 && windDeg <= 224) {
                wDegtext = "Ю/ЮЗ (" + windDeg + "&deg)"
            } else if (windDeg == 225) {
                wDegtext = "ЮЗ (" + windDeg + "&deg)"
            } else if (windDeg >= 226 && windDeg <= 269) {
                wDegtext = "З/ЮЗ (" + windDeg + "&deg)"
            } else if (windDeg == 270) {
                wDegtext = "З (" + windDeg + "&deg)"
            } else if (windDeg >= 271 && windDeg <= 314) {
                wDegtext = "З/СЗ (" + windDeg + "&deg)"
            } else if (windDeg == 315) {
                wDegtext = "СЗ (" + windDeg + "&deg)"
            } else if (windDeg >= 316 && windDeg <= 359) {
                wDegtext = "С/СЗ (" + windDeg + "&deg)"
            } else if (windDeg == 0 ) {
                wDegtext = "С (" + windDeg + "&deg)"
            }  

            wDeg.innerHTML = `${wDegtext}`

            let wVisibility = document.querySelector("#w-visibility");
            wVisibility.innerHTML = `${weatherData.visibility} м.</p>`;


            let timeOutput = document.querySelector("#long-day");
            let sunriceOutput = document.querySelector("#sunrise");
            let sunsetOutput = document.querySelector("#sunset");

            let sunrise = weatherData.sys.sunrise;
            let sunset = weatherData.sys.sunset;
            let timezone = weatherData.sys.timezone;  
            
            sunriceOutput.textContent = this.calcTime(sunrise, timezone);
            sunsetOutput.textContent = this.calcTime(sunset, timezone);

            let longDay = sunset - sunrise;
            timeOutput.textContent = this.calcTime(longDay, timezone);

        } catch (error) {
            console.error(error.message);
        }
    }
    
    calcTime(time, timezone) {
        return moment.utc(time,'X').add(timezone,'seconds').format('HH:mm');
        
    }
}
