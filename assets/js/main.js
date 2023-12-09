

class Weather {
    // lat;
    // lon;
    city;

    constructor(cityName) {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=df9c74ff1a47dcb48aab814fa5500429`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then(data => {
                // this.lat = data[0].lat;
                // this.lon = data[0].lon;
                this.city = data[0].local_names.uk;
                this.getWeather(data[0].lat, data[0].lon); // Вызываем getWeather после получения геоданных
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }

    getWeather(lat, lon) {
        let output = document.querySelector("#result");

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=dayli&appid=df9c74ff1a47dcb48aab814fa5500429&units=metric&lang=uk`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        output.innerHTML = `
                            <p>${this.city}</p>
                            <p>temp: ${data.main.temp}&degC </p>
                            <p>feels: ${data.main.feels_like}&degC </p>
                            <p>description: ${data.weather[0].description} </p>
                            <p>humidity : ${data.main.humidity}%</p>
                            <p>pressure : ${data.main.pressure}hPa</p>
                            <p>wind speed : ${data.wind.speed} m/s</p>
                            <p>wind gust : ${data.wind.gust} m/s</p>
                            <p>wind deg : ${data.wind.deg}&deg</p>
                            <p>visibility : ${data.visibility} m</p>
                            <p>clouds : ${data.clouds.all}%</p>
                        `;
                    });
                } else {
                    throw new Error(response.status);
                }
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }
}

document.querySelector("#cityBtn").addEventListener("click", function () {
    let inpCity = document.querySelector("#cityInp").value;

    new Weather(inpCity);
});