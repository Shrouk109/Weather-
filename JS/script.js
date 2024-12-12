let nameCountry = document.getElementById("name-country");
let dataRow = document.getElementById("data-row");

window.addEventListener("load", function () {
  const saveData = localStorage.getItem("weatherData");
  if (saveData) {
    dataRow.innerHTML = saveData;
  }
});

async function searchWeather(val) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=ba35a6916daf403493a161338241112&q=${val}&days=3&aqi=no&alerts=no`
    );
    let data = await response.json();
    let name = data.location.name;
    let country = data.location.country;
    let day1 = new Date(data.forecast.forecastday[0].date);
    let day2 = new Date(data.forecast.forecastday[1].date);
    let day3 = new Date(data.forecast.forecastday[2].date);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let box = "";
    if (
      name.toLowerCase().includes(val) ||
      country.toLowerCase().includes(val)
    ) {
      box = `
          <div class="col-md-4">
            <div class="inner">
              <div class="title bg-gray d-flex justify-content-between align-items-center px-2 pt-2 rounded-top">
                <p class="day">${days[day1.getDay()]}</p>
                <p class="date">${day1.getDate()} ${months[day1.getMonth()]}</p>
              </div>
              <div class="content bg-light-gray color-text p-3 rounded-bottom h-30">
                <p class="fs-5">${data.location.name}</p>
                <h1 class="text-white">${data.current.temp_c}&degC</h1>
                <img src="${
                  data.current.condition.icon
                }" class="w-25" alt="weather-state">
                <p class="text-primary">${
                  data.forecast.forecastday[0].day.condition.text
                }</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="inner">
              <div class="title bg-gray justify-content-center d-flex px-2 pt-2 rounded-top">
                <p class="day">${days[day2.getDay()]}</p>
              </div>
              <div class="content bg-light-gray color-text px-3 rounded-bottom text-center h-30 pt-5">
                <img src="${
                  data.forecast.forecastday[1].day.condition.icon
                }" alt="weather state">
                <h3 class="fw-bold text-white py-1">${
                  data.forecast.forecastday[1].day.maxtemp_c
                }&degC</h3>
                <span class="text-white fw-lighter d-block py-1">${
                  data.forecast.forecastday[1].day.mintemp_c
                }&deg</span>
                <p class="text-primary py-1">${
                  data.forecast.forecastday[1].day.condition.text
                }</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="inner">
              <div class="title bg-gray justify-content-center d-flex px-2 pt-2 rounded-top">
                <p class="day">${days[day3.getDay()]}</p>
              </div>
              <div class="content bg-light-gray color-text px-3 rounded-bottom text-center h-30 pt-5">
                <img src="${
                  data.forecast.forecastday[2].day.condition.icon
                }" alt="weather state">
                <h3 class="fw-bold text-white py-1">${
                  data.forecast.forecastday[2].day.maxtemp_c
                }&degC</h3>
                <span class="text-white fw-lighter d-block py-1">${
                  data.forecast.forecastday[2].day.mintemp_c
                }&deg</span>
                <p class="text-primary py-1">${
                  data.forecast.forecastday[2].day.condition.text
                }</p>
              </div>
            </div>
          </div>
      `;
      dataRow.innerHTML = box;
      localStorage.setItem("weatherData", box);
    }
  } catch (e) {
    console.log("error = ", e);
  }
}

nameCountry.addEventListener("input", function () {
  let val = nameCountry.value.trim().toLowerCase();
  if (val) {
    searchWeather(val);
  }
});

nameCountry.addEventListener("keydown", function (e) {
  let val = nameCountry.value.trim().toLowerCase();
  if (e.key === "Enter" && val) {
    searchWeather(val);
    location.reload();
    nameCountry.value = "";
  }
});
