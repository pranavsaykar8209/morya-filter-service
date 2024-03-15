import React from "react";
import { Routes , Route } from "react-router-dom";
import HomePage from "./components/Home-Page/home-page";
import about from "./components/About/about";
import { PageNotFound } from "./components/SharedComponents";

const AppRouts = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/about" Component={about} />
      <Route Component={PageNotFound} />
    </Routes>
  );
};

export default AppRouts;

