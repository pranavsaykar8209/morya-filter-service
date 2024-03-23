import React from "react";
import { Routes , Route } from "react-router-dom";
import HomePage from "./components/Home-Page/home-page";
import about from "./components/About/about";
import { PageNotFound } from "./components/SharedComponents";
import AddProductForm from "./components/Add-Products/add-product";

const AppRouts = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/add" Component={AddProductForm} />
      <Route Component={PageNotFound} />
    </Routes>
  );
};

export default AppRouts;

