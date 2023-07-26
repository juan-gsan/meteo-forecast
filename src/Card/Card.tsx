import { useCities } from "../hooks/use.cities";

export function Card() {
  const { handleLoadCity, city } = useCities();

  const handleLoad = () => {
    handleLoadCity();
  };

  return (
    <>
      {!city.hourly ? (
        <h1>No city</h1>
      ) : (
        <>
          <span>{city.hourly.temperature_2m[0]}</span>
        </>
      )}

      <button onClick={handleLoad}>Load</button>
    </>
  );
}
