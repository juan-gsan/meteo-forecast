import { useEffect } from "react";
import { useCities } from "../hooks/use.cities";
import { useWeather } from "../hooks/use.weather";

export function Card() {
  const { city } = useCities();
  const { handleLoadWeather, weather } = useWeather();

  useEffect(() => {
    handleLoadWeather(
      city.latitude.toString(),
      city.longitude.toString(),
      city.timezone
    );
  }, [handleLoadWeather, city.latitude, city.longitude, city.timezone]);

  return (
    <>
      <section>
        <p>city: {city.name}</p>
        <p>country: {city.country}</p>
        <p>country code: {city.country_code}</p>
      </section>
      {!weather.current_weather && !weather.daily ? (
        <></>
      ) : (
        <section>
          <div>
            <span>code: {weather.current_weather.weathercode}</span>
          </div>
          <div>
            <span>current: {weather.current_weather.temperature}</span>
            <span>°C</span>
          </div>
          <div>
            <p>hour: {weather.current_weather.time.slice(11)}</p>
            <p>day: {weather.current_weather.time.slice(0, 10)}</p>
          </div>
          {/* <div>
            <span>{weather.current_weather.winddirection}</span>
            <span>{weather.current_weather.windspeed}</span>
          </div> */}
          <div>
            <p>min: {weather.daily.temperature_2m_min[0]}</p>
            <p>max: {weather.daily.temperature_2m_max[0]}</p>
          </div>
        </section>
      )}
    </>
  );
}
