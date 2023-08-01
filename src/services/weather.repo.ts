import { Weather } from "../models/weather";

export class WeatherRepo {
  constructor(public url: string) {}

  async getWeatherByCity(
    lat: string,
    long: string,
    timezone: string
  ): Promise<Weather> {
    const response = await fetch(
      `${this.url}?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=${timezone}`
    );
    const data = (await response.json()) as Promise<Weather>;
    return data;
  }
}
