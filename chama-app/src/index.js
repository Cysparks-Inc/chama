// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Optional: your CSS file
import App from "./App"; // Import your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This connects the app to the index.html file
);
