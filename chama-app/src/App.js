// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route when the app loads */}
        <Route path="/" element={<Dashboard />} />
        {/* You can add more routes here in the future */}
      </Routes>
    </Router>
  );
}

export default App;
