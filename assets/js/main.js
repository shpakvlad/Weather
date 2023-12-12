let weather = new Weather();

const inputs = [];

document.addEventListener("DOMContentLoaded", function () {
    weather.getWeather("Klaipeda");
});

document.querySelector("#reset-location").addEventListener("click", function () {
    weather.getWeather("Klaipeda");

})

document.querySelector("#city-btn").addEventListener("click", function () {
    let inpCity = document.querySelector("#city-input");

    weather.getWeather(inpCity.value);
    addInput(inpCity.value);

    inpCity.value = '';
});

function addInput(inpCity) {
    if (!hasDuplicates(inpCity)) {
        inputs.push(inpCity);

        if (inputs.length > 5) {
            inputs.shift();
        }

        let history = document.querySelector("#search-history");

        history.innerHTML = "";

        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];

            let p = document.createElement("p");
            p.textContent = element;
            p.addEventListener("click", function () {
                weather.getWeather(this.textContent);
            });

            history.appendChild(p);
        }
    }
}

function hasDuplicates(input) {
    if (inputs.indexOf(input) > 0) {
        return true;
    }

    return false;
}

document
    .querySelector("#city-input")
    .addEventListener("keypress", function (event) {
        const KEY = event.key;

        if (KEY === "Enter") {
            let inpCity = document.querySelector("#city-input");

            weather.getWeather(inpCity.value);
            addInput(inpCity.value);
        
            inpCity.value = '';
        }
    });
