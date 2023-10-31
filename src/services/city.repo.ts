import { City } from "../models/city";
import { CityResponse } from "../types/city.response";

export class CityRepo {
  constructor(public url: string) {}

  async getCities(cityName: string): Promise<City[]> {
    const response = await fetch(
      `${this.url}?name=${cityName}&count=5&language=en&format=json`
    );
    const data = response.json() as Promise<CityResponse>;
    return (await data).results;
  }
}
