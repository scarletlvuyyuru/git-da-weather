function formatDate(date) {
  let currentDate = new Date();
  let day = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = currentDate.getMonth();
  let months = [
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

  let currentDay = currentDate.getDate();

  let year = currentDate.getFullYear();

  let today = ` ${days[day]}, ${months[month]}  ${date}  ${year} `;
  document.getElementById("local-time").innerHTML = today;
}

function search(city) {
  let apiKey = "650d0d4b7a63037f35001c903db11419";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=650d0d4b7a63037f35001c903db11419&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;
  search(city);
}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "650d0d4b7a63037f35001c903db11419";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

let h1 = document.querySelector("h1");
let currentTime = new Date();

let form = document.querySelector("#searchBar");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);
h1.innerHTML = formatDate(currentTime);

form.addEventListener("submit", handleSubmit);

search("New York");
