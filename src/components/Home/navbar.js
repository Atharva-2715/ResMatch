import "./navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="heading-container">
        <h2>ResMatch</h2>
      </div>

      <div className="nav-links">
        <ul className="ul">
          <li className="li">
            <a className="button1" href="#home">
              <p className="p">Home</p>
            </a>
          </li>
          <li className="li">
            <a className="button1" href="#about">
              <p className="p">About Me</p>
            </a>
          </li>
          <li className="li">
            <a className="button1" href="#how-it-works">
              <p className="p"> How it Works</p>
            </a>
          </li>
        </ul>
      </div>

      <div className="login-btn">
        <button onClick={handleLoginClick}   className="btn">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
