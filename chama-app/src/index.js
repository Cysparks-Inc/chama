// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // CSS file
import App from "./App"; // Import  App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // connects the app to the index.html file
);
