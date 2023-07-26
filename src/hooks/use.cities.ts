import { useCallback, useMemo } from "react";
import { MeteoRepo } from "../services/meteo.repo";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadAsyncCity } from "../redux/thunks";

export function useCities() {
  const { city } = useSelector((state: RootState) => state.cities);
  const dispatch: AppDispatch = useDispatch();

  const meteoUrl = "https://api.open-meteo.com/v1/forecast";

  const lat = "52.52";
  const long = "13.41";
  const timezone = "Europe%2FBerlin";

  const repo: MeteoRepo = useMemo(() => new MeteoRepo(meteoUrl), []);

  const handleLoadCity = useCallback(() => {
    dispatch(loadAsyncCity({ repo, lat, long, timezone }));
  }, [repo, lat, long, timezone, dispatch]);

  return {
    city,
    handleLoadCity,
  };
}
