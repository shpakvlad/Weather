let weather = new Weather();

document.addEventListener("DOMContentLoaded", function () {
    weather.getWeather("Klaipeda");
});

document.querySelector("#city-btn").addEventListener("click", function () {
    let inpCity = document.querySelector("#city-input").value;
    // let weather = new Weather;
    weather.getWeather(inpCity);
});

document
    .querySelector("#city-input")
    .addEventListener("keypress", function (event) {
        const KEY = event.key;

        if (KEY === "Enter") {
            let inpCity = document.querySelector("#city-input").value;
            // let weather = new Weather;
            weather.getWeather(inpCity);
        }
    });
