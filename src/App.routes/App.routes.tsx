import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Card } from "../Card/Card";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/card" element={<Card></Card>}></Route>
    </Routes>
  );
}
