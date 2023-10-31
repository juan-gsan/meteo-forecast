import { useEffect } from "react";
import { useCities } from "../hooks/use.cities";
import { useWeather } from "../hooks/use.weather";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../assets/bootstrap.custom.css";
import "../assets/index.css";
import { CloseButton } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { City } from "../models/city";
export function WeatherCard() {
  const { cities } = useCities();
  const { id } = useParams();
  const { handleLoadWeather, weather } = useWeather();

  const city: City = cities.find((city) => city.id === Number(id)) as City;

  useEffect(() => {
    handleLoadWeather(
      city.latitude.toString(),
      city.longitude.toString(),
      city.timezone
    );
  }, [handleLoadWeather, city.latitude, city.longitude, city.timezone]);

  return (
    <>
      {!weather.current_weather && !weather.daily ? (
        <></>
      ) : (
        <>
          <Card className="container" style={{ width: "18rem" }}>
            <Link to={"/"}>
              <CloseButton className="close-button" />
            </Link>
            <Card.Body>
              <Card.Title>{city.name}</Card.Title>
              <Card.Subtitle>{city.country}</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Temperature: {weather.current_weather.temperature} °C
              </ListGroup.Item>
              <ListGroup.Item>
                Hour: {weather.current_weather.time.slice(11)}
              </ListGroup.Item>
              <ListGroup.Item>
                Day: {weather.current_weather.time.slice(0, 10)}
              </ListGroup.Item>
              <ListGroup.Item>
                Min. Temperature: {weather.daily.temperature_2m_min[0]} °C
              </ListGroup.Item>
              <ListGroup.Item>
                Max. Temperature: {weather.daily.temperature_2m_max[0]} °C
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      )}
    </>
  );
}
