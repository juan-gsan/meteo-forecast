import { City } from "../models/city";

export class MeteoRepo {
  constructor(public url: string) {}

  async getCity(lat: string, long: string, timezone: string): Promise<City> {
    const response = await fetch(
      `${this.url}?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=${timezone}`
    );
    const data = (await response.json()) as Promise<City>;
    return data;
  }
}
