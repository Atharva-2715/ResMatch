import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";


const EnhancedLoginForm = () => {

  const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate("/dashboard");
    };

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (isSignUp && !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (isSignUp && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  return (
    <div
      style={{
        color: "#fff",
        fontFamily: "monospace, serif",
        letterSpacing: "0.05em",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <style>{`

      `}</style>
  
      <div className={`form horizontal-form ${isSignUp ? "signup-form" : ""}`}>
        <div className="logo-container">
          <div className="logo">ResMatch</div>
          <div className="tagline">Connecting Talent with Opportunity</div>
        </div>

        <div className="form-content">
          <div className="form-header">
            <div className="form-toggle">
              <button
                className={`toggle-btn ${!isSignUp ? "active" : ""}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button
                className={`toggle-btn ${isSignUp ? "active" : ""}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="social-login">
            <div className="social-buttons">
              <button className="social-btn">
                <span>G</span> Google
              </button>
              <button className="social-btn">
                <span>in</span> LinkedIn
              </button>
            </div>

            <div className="divider">
              <span>or continue with email</span>
            </div>
          </div>

          <div onSubmit={handleSubmit}>
            <div className="control block-cube block-input">
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "error" : ""}
              />
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
              <div className="error-message">{errors.username}</div>
            </div>

            {isSignUp && (
              <div className="control block-cube block-input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
                <div className="error-message">{errors.email}</div>
              </div>
            )}

            <div className="control block-cube block-input">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
              />
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
              <div className="error-message">{errors.password}</div>
            </div>

            {isSignUp && (
              <div className="control block-cube block-input">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                <div className="bg-top">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg-right">
                  <div className="bg-inner"></div>
                </div>
                <div className="bg">
                  <div className="bg-inner"></div>
                </div>
                <div className="error-message">{errors.confirmPassword}</div>
              </div>
            )}

            {!isSignUp && (
              <div className="checkbox-container">
                <div className="checkbox-cube">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-visual"></div>
                </div>
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            )}

            <button onClick={handleLoginClick} type="submit" className="btn block-cube block-cube-hover">
              <div className="bg-top">
                <div className="bg-inner"></div>
              </div>
              <div className="bg-right">
                <div className="bg-inner"></div>
              </div>
              <div className="bg">
                <div className="bg-inner"></div>
              </div>
              <div className="text">
                {isSignUp ? "Create Account" : "Log In"}
              </div>
            </button>

            <div className="form-footer">
              {!isSignUp && (
                <div style={{ marginBottom: "1rem" }}>
                  <a href="#" className="link">
                    Forgot Password?
                  </a>
                </div>
              )}

              <div>
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span className="link" onClick={() => setIsSignUp(false)}>
                      Sign In
                    </span>
                  </>
                ) : (
                  <>
                    New to ResMatch?{" "}
                    <span className="link" onClick={() => setIsSignUp(true)}>
                      Create Account
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoginForm;
