import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { WeatherCard } from "../Card/Card";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/card/:id" element={<WeatherCard></WeatherCard>}></Route>
    </Routes>
  );
}
