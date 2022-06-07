import React from "react";

import "./App.scss";

import { Banner } from "./components/Banner/Banner";

import { OPPONENTS } from "./constants";

export const App = () => {
  return (
    <div className="app">
      {OPPONENTS.map((banner, index) => (
        <Banner key={index} {...banner} />
      ))}
    </div>
  );
};
