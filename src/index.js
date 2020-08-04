import "./config";
import React from "react";
import ReactDOM from "react-dom";
import Maps from "./components/Maps";

const addDOMNode = () => {
  const appNode = document.createElement("div");
  appNode.id = "app";
  document.body.appendChild(appNode);
  return appNode;
};

ReactDOM.render(
  <div className="main">
    <Maps />
  </div>,
  addDOMNode()
);
