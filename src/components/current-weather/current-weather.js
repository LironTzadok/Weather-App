import "./current-weather.css";

const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="weather white-block">
      <div className="top">
        <div>
          <span className="city">
            {weatherData.fromAPI ? weatherData.name : weatherData.city}
          </span>
          <span className="weather-description">
            {weatherData.weather[0].description}
          </span>
        </div>
        <img
          alt="weather icon"
          className="weather-icon"
          src={`icons/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(weatherData.main.temp)}°</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(weatherData.main.feels_like)}°
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">
              {weatherData.main.humidity}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {weatherData.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
