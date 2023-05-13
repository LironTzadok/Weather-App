import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WHEATER_API_KEY } from "./api";
import { useEffect, useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const lat = 40.71427;
  const lon = -74.00597;

  const [currentWeahther, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const changeWeather = (lat, lon, fromAPI, cityName = "") => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WHEATER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WHEATER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({
          fromAPI: fromAPI,
          city: cityName,
          ...weatherResponse,
        });
        setCurrentForecast({ city: cityName, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSearchChange = (searchData) => {
    const [latSearch, lonSearch] = searchData.value.split(" ");
    changeWeather(latSearch, lonSearch, false, searchData.label);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        changeWeather(
          position.coords.latitude,
          position.coords.longitude,
          true
        );
      },
      () => {
        changeWeather(lat, lon, true);
      }
    );
  }, []);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="search-result">
        {currentWeahther && <CurrentWeather weatherData={currentWeahther} />}
        {currentForecast && <Forecast forecastData={currentForecast} />}
      </div>
      <div className="linkedin-wrapper">
        <a
          className="linkedin-link"
          href="https://www.linkedin.com/in/liron-tzadok-cs/"
          target="_blank"
        >
          Let's connect on LinkedIn
          <img
            className="linkedin-logo"
            src={`${window.location.href}/assets/linkedin-logo.png`}
          />
        </a>
      </div>
    </div>
  );
}

export default App;
