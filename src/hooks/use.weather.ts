import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { WeatherRepo } from "../services/weather.repo";
import { useCallback, useMemo } from "react";
import { loadAsyncWeather } from "../redux/thunks";

export function useWeather() {
  const { weather } = useSelector((state: RootState) => state.weather);
  const dispatch: AppDispatch = useDispatch();

  const weatherUrl = "https://api.open-meteo.com/v1/forecast";

  const repo: WeatherRepo = useMemo(() => new WeatherRepo(weatherUrl), []);

  const handleLoadWeather = useCallback(
    (lat: string, long: string, timezone: string) => {
      dispatch(loadAsyncWeather({ repo, lat, long, timezone }));
    },
    [repo, dispatch]
  );

  return {
    weather,
    handleLoadWeather,
  };
}
