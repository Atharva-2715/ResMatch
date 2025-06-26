import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          className="App"
          element={<Home />}
        />
        <Route path="/login" element={<LoginPage />} />

        <Route path='/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
