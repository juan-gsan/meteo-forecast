import { SyntheticEvent, useState } from "react";
import { useCities } from "../hooks/use.cities";
import { City } from "../models/city";
import { Link } from "react-router-dom";

export type FormState = Pick<City, "name">;

export function Home() {
  const { handleLoadCity, city } = useCities();
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
    handleLoadCity(cityName);
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
      {!city ? (
        <></>
      ) : (
        <Link to={"/card"}>
          <section>
            <p>{city.name}</p>
            <p>{city.country}</p>
            <p>{city.country_code}</p>
          </section>
        </Link>
      )}
    </>
  );
}
