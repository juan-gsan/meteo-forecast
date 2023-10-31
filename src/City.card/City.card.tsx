import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { City } from "../models/city";

type PropsType = {
  city: City;
};
export function CityCard({ city }: PropsType) {
  return (
    <li key={city.id}>
      <Link className="navigation" to={`/card/${city.id}`}>
        <Card className="container" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{city.name}</Card.Title>
            <Card.Subtitle>{city.country}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    </li>
  );
}
