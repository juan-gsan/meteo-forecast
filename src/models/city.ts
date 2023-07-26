import { Daily } from "../types/daily";
import { DailyUnits } from "../types/daily.units";
import { Hourly } from "../types/hourly";
import { HourlyUnits } from "../types/hourly.units";

export interface City {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}
