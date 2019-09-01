const cityForm = document.querySelector("form");

const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = data => {
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  console.log(data);

  // Destructure properties

  const { cityDetails, weather } = data;

  // update details template
  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="display-4 my-4">
  <span>${weather.Temperature.Imperial.Value}</span>
  <span>&deg;F</span>
</div>`;

  // Update the night/day & icon images

  const iconSrc = `icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "dayTime.png" : "nighTime.png";
  // if (weather.IsDayTime) {
  //   timeSrc = "day.svg";
  // } else {
  //   timeSrc = "night.svg";
  // }
  time.setAttribute("src", timeSrc);

  // Remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  //   object shorthand notation (cityDetails: cityDetails)
  return {
    cityDetails,
    weather
  };
};

cityForm.addEventListener("submit", e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the UI with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
