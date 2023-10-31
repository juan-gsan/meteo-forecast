import { SyntheticEvent, useState } from "react";
import { useCities } from "../hooks/use.cities";
import { City } from "../models/city";
import { CityCard } from "../City.card/City.card";

export type FormState = Pick<City, "name">;

export function Home() {
  const { handleLoadCities, cities } = useCities();
  const [formState, setFormState] = useState<FormState>({ name: "" });

  const handleChange = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    setFormState({
      ...formState,
      [element.name]: element.value,
    });
  };

  const handleLoad = async (event: SyntheticEvent) => {
    event.preventDefault();
    const cityName = formState.name;
    handleLoadCities(cityName);
  };

  return (
    <>
      <h1>MeteoForecast</h1>
      <form onSubmit={handleLoad} aria-label="form">
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Search location..."
        />
        <button type="submit">Search</button>
      </form>
      {!cities ? (
        <></>
      ) : (
        cities.map((city) => <CityCard key={city.id} city={city} />)
      )}
    </>
  );
}
