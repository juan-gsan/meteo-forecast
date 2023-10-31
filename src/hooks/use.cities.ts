import { useCallback, useMemo } from "react";
import { CityRepo } from "../services/city.repo";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadAsyncCities } from "../redux/thunks";

export function useCities() {
  const { cities } = useSelector((state: RootState) => state.cities);
  const isLoading = useSelector(
    (state: RootState) => state.cities?.status === "loading"
  );
  const dispatch: AppDispatch = useDispatch();

  const cityUrl = "https://geocoding-api.open-meteo.com/v1/search";

  const repo: CityRepo = useMemo(() => new CityRepo(cityUrl), []);

  const handleLoadCities = useCallback(
    (cityName: string) => {
      dispatch(loadAsyncCities({ repo, cityName }));
    },
    [repo, dispatch]
  );

  return {
    cities,
    isLoading,
    handleLoadCities,
  };
}
