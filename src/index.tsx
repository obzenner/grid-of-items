import React from "react";
import ReactDOM from "react-dom";
import Ninjas from "./components/Ninjas";

interface NinjasWindow extends Window {
  INITIAL_DATA: any;
}

declare var window: NinjasWindow;


ReactDOM.hydrate(
  <Ninjas data={window.INITIAL_DATA} />,
  document.getElementById("root")
);