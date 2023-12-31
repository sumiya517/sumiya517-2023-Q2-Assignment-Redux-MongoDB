import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard.js";
import Header from "./components/header.js";
import DeviceList from "./pages/deviceList.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/devices"exact  element={<DeviceList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
