import React, { useRef, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import userLogo from "../assests/userlogo.png";
import home from "../assests/home.png";
import dash from "../assests/dashboard.png";
import logout from "../assests/logout.png";
import settings from "../assests/setting.png";
import upload from "../assests/upload.png";

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");

  const navigate = useNavigate();
  
  const handleHomeClick = () => {
      navigate("/");
  };

  const handleDashClick = () => {
    navigate('/dashboard');
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSettingClick = () => {
    alert("Settings feature coming soon!");
  }

  

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }
  
    console.log("Sending to backend:", { resumeText, jobDescription });
  
    try {
      console.log("👉 Fetching /analyze");
      // Using proxy - relative URL
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
  
      const rawText = await response.text();
      console.log("🔍 RAW response from backend:", rawText);
  
      try {
        const data = JSON.parse(rawText);
        console.log("✅ Received response:", data);
        console.log("📊 Analysis data type:", typeof data.analysis);
        console.log("📊 Analysis content:", data.analysis);
        
        if (data.analysis) {
          // Make sure we're setting a string
          const analysisText = typeof data.analysis === 'string' 
            ? data.analysis 
            : JSON.stringify(data.analysis, null, 2);
          setAnalysis(analysisText);
        } else if (data.error) {
          console.error("❌ Server error:", data.error);
          setAnalysis(`Server Error: ${data.error}`);
        } else {
          console.error("❌ No analysis in response:", data);
          setAnalysis("No analysis received. Response: " + JSON.stringify(data, null, 2));
        }
      } catch (err) {
        console.error("❌ Failed to parse response JSON:", err.message);
        console.error("❌ Raw response:", rawText);
        setAnalysis(`Parse Error: ${err.message}\n\nRaw Response: ${rawText}`);
      }
    } catch (error) {
      console.error("❌ Network/Fetch error:", error);
      console.error("❌ Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      setAnalysis(`Network Error: ${error.message}\n\nPlease check:\n- Backend server is running on port 8000\n- Proxy is configured correctly\n- No firewall blocking the connection`);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["text/plain"];

      if (file.type === "application/pdf") {
        alert("PDF support coming soon! Please upload .txt for now.");
        return;
      }

      if (!validTypes.includes(file.type)) {
        alert("Please select a valid .txt file.");
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = function (event) {
        setResumeText(event.target.result);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <div className="heading-container">
          <h1>ResMatch</h1>
          <p>Connecting Talent with Opportunity</p>
        </div>
        <div className="profile-container">
          <h4>Welcome User</h4>
          <img src={userLogo} alt="Profile" className="profile-image" />
        </div>
      </div>

      <div className="content">
        <div className="left-panel">
          <div className="button-container">
            <div onClick={handleHomeClick}className="button">
              <img src={home} alt="home" className="icon" />
              <span className="label">Home</span>
            </div>
            <div onClick={handleDashClick} className="button">
              <img src={dash} alt="dashboard" className="icon" />
              <span className="label">Dashboard</span>
            </div>
            <div onClick={handleLoginClick}className="button">
              <img src={logout} alt="logout" className="icon" />
              <span className="label">Logout</span>
            </div>
            <div onClick={handleSettingClick}className="button">
              <img src={settings} alt="settings" className="icon" />
              <span className="label">Settings</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="cards-container">
            <div className="upload-section">
              <h2>
                <img src={upload} alt="Upload" />
                Upload Your Resume
              </h2>
              <div onClick={handleButtonClick} className="upload-button">
                {fileName ? `Selected: ${fileName}` : "Click to upload your resume"}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".txt"
                onChange={handleFileChange}
              />
              <p>Supported formats: TXT</p>
            </div>

            <div className="description-section">
              <h2>Job Description</h2>
              <textarea
                className="description-input"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={8}
              />
            </div>
          </div>

          <div className="analayze-btn" onClick={handleAnalyze}>
            <button className="analyzebutton">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">Analyze</span>
              </span>
            </button>
          </div>

          {analysis && (
            <div className="analysis-result">
              <h3>Analysis Result</h3>
              <p>{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
