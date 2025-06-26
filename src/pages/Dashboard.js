import React, { useRef, useState } from "react";
import "./Dashboard.css";
import userLogo from "../assests/userlogo.png";
import home from "../assests/home.png";
import dash from "../assests/dashboard.png";
import logout from "../assests/logout.png";
import settings from "../assests/setting.png";
import upload from '../assests/upload.png';

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (validTypes.includes(file.type)) {
        setFileName(file.name);
        console.log("Selected file:", file);
      } else {
        alert("Please select a PDF or Word document.");
      }
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
            <div className="button">
              <img src={home} alt="home" className="icon" />
              <span className="label">Home</span>
            </div>

            <div className="button">
              <img src={dash} alt="dashboard" className="icon" />
              <span className="label">Dashboard</span>
            </div>

            <div className="button">
              <img src={logout} alt="logout" className="icon" />
              <span className="label">Logout</span>
            </div>

            <div className="button">
              <img src={settings} alt="settings" className="icon" />
              <span className="label">Settings</span>
            </div>
          </div>
        </div>

        <div className="right-panel">
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
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
            />
            <p>Supported formats: PDF, DOC, DOCX</p>
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
      </div>
    </div>
  );
};

export default Dashboard;