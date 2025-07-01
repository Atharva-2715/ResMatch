import React, { useRef, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import userLogo from "../assests/userlogo.png";
import home from "../assests/home.png";
import dash from "../assests/dashboard.png";
import logout from "../assests/logout.png";
import settings from "../assests/setting.png";
import upload from "../assests/upload.png";

const API_URL = process.env.REACT_APP_API_URL; //used only for production.


const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const parseAnalysisResponse = (analysisText) => {
    console.log("🔍 parseAnalysisResponse called with:", analysisText);
    console.log("🔍 Type of analysisText:", typeof analysisText);

    // Initialize default structure
    const defaultResult = {
      matchScore: "N/A",
      strengths: [],
      weaknesses: [],
      suggestions: [],
    };

    if (!analysisText || typeof analysisText !== "string") {
      console.log("❌ Invalid analysisText:", analysisText);
      return defaultResult;
    }

    try {
      // Try to extract match score with more patterns
      const scorePatterns = [
        /\*\*\s*Match\s*Score\s*(?:\([^)]*\))?\s*:\s*\*\*\s*(\d+)/i,
        /Match\s*Score[^0-9]{0,20}(\d+)/i,
        /Score[^0-9]{0,10}(\d+)/i,
        /(\d+)%?\s*match/i,
        /compatibility[^0-9]{0,20}(\d+)/i,
      ];

      let matchScore = "N/A";
      for (const pattern of scorePatterns) {
        const match = analysisText.match(pattern);
        if (match) {
          matchScore = `${match[1]}%`;
          break;
        }
      }
      console.log("📊 Extracted match score:", matchScore);

      // More comprehensive section parsing
      const sections = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
      };

      // Define section patterns with more variations
      const sectionPatterns = {
        strengths: [
          /\*\*\s*(?:Key\s*)?Strengths?\s*:?\s*\*\*\s*([\s\S]*?)(?=\*\*|$)/gi,
          /##\s*(?:Key\s*)?Strengths?\s*:?\s*([\s\S]*?)(?=##|$)/gi,
          /(?:^|\n)\s*(?:Key\s*)?Strengths?\s*:?\s*([\s\S]*?)(?=(?:^|\n)\s*(?:Weaknesses?|Areas?\s+for\s+Improvement|Suggestions?|Recommendations?)|$)/gi,
          /Strong\s+points?[:\s]*([\s\S]*?)(?=(?:Weak|Areas?\s+for|Suggestions?|Recommendations?)|$)/gi,
        ],
        weaknesses: [
          /\*\*\s*(?:Weaknesses?|Areas?\s+for\s+Improvement)\s*:?\s*\*\*\s*([\s\S]*?)(?=\*\*|$)/gi,
          /##\s*(?:Weaknesses?|Areas?\s+for\s+Improvement)\s*:?\s*([\s\S]*?)(?=##|$)/gi,
          /(?:^|\n)\s*(?:Weaknesses?|Areas?\s+for\s+Improvement)\s*:?\s*([\s\S]*?)(?=(?:^|\n)\s*(?:Strengths?|Suggestions?|Recommendations?)|$)/gi,
          /(?:Areas?\s+for\s+improvement|Improvement\s+areas?)[:\s]*([\s\S]*?)(?=(?:Strengths?|Suggestions?|Recommendations?)|$)/gi,
        ],
        suggestions: [
          /\*\*\s*(?:Suggestions?|Recommendations?|Action\s+Items?)\s*(?:to\s+improve\s+the\s+resume)?\s*:?\s*\*\*\s*([\s\S]*?)(?=\*\*|$)/gi,
          /##\s*(?:Suggestions?|Recommendations?|Action\s+Items?)\s*(?:to\s+improve\s+the\s+resume)?\s*:?\s*([\s\S]*?)(?=##|$)/gi,
          /(?:^|\n)\s*(?:Suggestions?|Recommendations?|Action\s+Items?)\s*(?:to\s+improve\s+the\s+resume)?\s*:?\s*([\s\S]*?)$/gi,
          /(?:Recommendations?|Next\s+steps?)[:\s]*([\s\S]*?)$/gi,
        ],
      };

      // Extract content for each section
      Object.keys(sectionPatterns).forEach((sectionName) => {
        const patterns = sectionPatterns[sectionName];

        for (const pattern of patterns) {
          const matches = [...analysisText.matchAll(pattern)];
          if (matches.length > 0) {
            matches.forEach((match) => {
              if (match[1] && match[1].trim()) {
                sections[sectionName].push(match[1].trim());
              }
            });
            break; // Stop after finding content with first successful pattern
          }
        }
      });

      console.log("📝 Raw extracted sections:", sections);

      // More lenient item parsing function
      const parseItems = (contentArray) => {
        if (!contentArray || contentArray.length === 0) return [];

        const allItems = [];

        contentArray.forEach((content) => {
          // Clean content but keep more of it
          let cleanContent = content
            .replace(/\*\*([^*]*)\*\*/g, "$1") // Remove bold formatting but keep text
            .replace(/#{1,6}\s*/g, "") // Remove markdown headers
            .replace(/^\s*-+\s*$/gm, "") // Remove separator lines
            .trim();

          // Split by various delimiters - more comprehensive
          const items = cleanContent
            .split(
              /(?:\n\s*[-*•]\s*|\n\s*\d+\.\s*|\n{2,}|\n\s*[:\-]\s*|\.\s*(?=[A-Z])|\n)/
            )
            .map((item) => {
              return item
                .replace(/^[-*•\d.)\s]+/, "") // Remove bullet points and numbers
                .replace(/^\s*[:\-]\s*/, "") // Remove leading colons or dashes
                .replace(/\s+/g, " ") // Normalize whitespace
                .trim();
            })
            .filter((item) => {
              // Much more lenient filtering
              return (
                item.length > 8 && // Reduced from 15 to 8
                !item.match(/^[:\-\s*]+$/) &&
                !item.toLowerCase().includes("match score") &&
                item.split(" ").length > 1
              ); // At least 2 words (reduced from 3)
            });

          allItems.push(...items);
        });

        // Remove duplicates but be more lenient
        const uniqueItems = [];
        const seen = new Set();

        allItems.forEach((item) => {
          const normalized = item
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .trim();
          if (!seen.has(normalized) && item.length > 5) {
            // Reduced from 15 to 5
            seen.add(normalized);
            uniqueItems.push(item);
          }
        });

        return uniqueItems.slice(0, 8); // Increased from 6 to 8 items max
      };

      // Build final result
      const result = {
        matchScore,
        strengths: parseItems(sections.strengths),
        weaknesses: parseItems(sections.weaknesses),
        suggestions: parseItems(sections.suggestions),
      };

      console.log("✅ Final parsed result:", result);

      // Enhanced fallback: if no structured content found, try multiple approaches
      if (
        result.strengths.length === 0 &&
        result.weaknesses.length === 0 &&
        result.suggestions.length === 0
      ) {
        console.log(
          "🔄 No structured content found, trying fallback parsing..."
        );

        // Try different fallback approaches
        const lines = analysisText
          .split("\n")
          .filter((line) => line.trim().length > 10); // Reduced threshold

        // Look for lines that start with common patterns
        const bulletPoints = lines.filter(
          (line) =>
            /^\s*[-*•]\s*/.test(line) ||
            /^\s*\d+\.\s*/.test(line) ||
            /^\s*[A-Z]/.test(line.trim())
        );

        // If we have bullet points, use those
        if (bulletPoints.length > 0) {
          const cleanedItems = bulletPoints
            .map((line) => line.replace(/^\s*[-*•\d.)\s]+/, "").trim())
            .filter((item) => item.length > 5);

          // Distribute across categories
          const itemsPerCategory = Math.ceil(cleanedItems.length / 3);
          result.strengths = cleanedItems.slice(0, itemsPerCategory);
          result.weaknesses = cleanedItems.slice(
            itemsPerCategory,
            itemsPerCategory * 2
          );
          result.suggestions = cleanedItems.slice(itemsPerCategory * 2);
        } else {
          // Last resort: split by sentences and take meaningful ones
          const sentences = analysisText
            .split(/[.!?]+/)
            .filter(
              (sentence) =>
                sentence.trim().length > 15 &&
                !sentence.toLowerCase().includes("match score")
            );

          if (sentences.length > 0) {
            const itemsPerCategory = Math.ceil(sentences.length / 3);
            result.strengths = sentences
              .slice(0, itemsPerCategory)
              .map((s) => s.trim());
            result.weaknesses = sentences
              .slice(itemsPerCategory, itemsPerCategory * 2)
              .map((s) => s.trim());
            result.suggestions = sentences
              .slice(itemsPerCategory * 2)
              .map((s) => s.trim());
          }
        }
      }

      // Final safety check - if still empty, show raw content in suggestions
      if (
        result.strengths.length === 0 &&
        result.weaknesses.length === 0 &&
        result.suggestions.length === 0
      ) {
        console.log("🔄 All parsing failed, showing raw content...");
        const rawLines = analysisText
          .split("\n")
          .filter(
            (line) =>
              line.trim().length > 10 &&
              !line.toLowerCase().includes("match score")
          )
          .slice(0, 5);

        result.suggestions = rawLines.map((line) => line.trim());
      }

      return result;
    } catch (error) {
      console.error("❌ Error parsing analysis:", error);
      return defaultResult;
    }
  };
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleDashClick = () => {
    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSettingClick = () => {
    alert("Settings feature coming soon!");
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    console.log("🚀 Starting analysis...");
    console.log("📄 Resume text length:", resumeText.length);
    console.log("📝 Job description length:", jobDescription.length);

    setIsLoading(true);

    try {
      console.log("👉 Fetching /api/analyze");
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      const rawText = await response.text();
      console.log("🔍 RAW response length:", rawText.length);
      console.log(
        "🔍 RAW response first 500 chars:",
        rawText.substring(0, 500)
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, response: ${rawText}`
        );
      }

      try {
        const data = JSON.parse(rawText);
        console.log("✅ Parsed JSON successfully");
        console.log("📊 Response data keys:", Object.keys(data));
        console.log("📊 Analysis field type:", typeof data.analysis);

        if (data.analysis) {
          console.log(
            "📊 Analysis content preview:",
            data.analysis.substring(0, 200)
          );
          const analysisText =
            typeof data.analysis === "string"
              ? data.analysis
              : JSON.stringify(data.analysis, null, 2);

          console.log(
            "✅ Setting analysis state with:",
            analysisText.substring(0, 100)
          );
          setAnalysis(analysisText);
        } else {
          console.error("❌ No analysis field in response");
          console.error("❌ Available fields:", Object.keys(data));
          setAnalysis(
            `No analysis received. Available fields: ${Object.keys(data).join(
              ", "
            )}`
          );
        }
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError);
        console.error("❌ Raw text that failed to parse:", rawText);
        setAnalysis(
          `Parse Error: ${parseError.message}\n\nRaw Response: ${rawText}`
        );
      }
    } catch (error) {
      console.error("❌ Network/Fetch error:", error);
      setAnalysis(`Network Error: ${error.message}`);
    } finally {
      setIsLoading(false);
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
        console.log("📄 File loaded, length:", event.target.result.length);
        setResumeText(event.target.result);
      };

      reader.readAsText(file);
    }
  };

  console.log(
    "🎨 Render - analysis state:",
    analysis ? "HAS CONTENT" : "EMPTY"
  );
  console.log("🎨 Render - analysis length:", analysis?.length || 0);

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
            <div onClick={handleHomeClick} className="button">
              <img src={home} alt="home" className="icon" />
              <span className="label">Home</span>
            </div>
            <div onClick={handleDashClick} className="button">
              <img src={dash} alt="dashboard" className="icon" />
              <span className="label">Dashboard</span>
            </div>
            <div onClick={handleLoginClick} className="button">
              <img src={logout} alt="logout" className="icon" />
              <span className="label">Logout</span>
            </div>
            <div onClick={handleSettingClick} className="button">
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
                {fileName
                  ? `Selected: ${fileName}`
                  : "Click to upload your resume"}
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
            <button className="analyzebutton" disabled={isLoading}>
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">
                  {isLoading ? "Analyzing..." : "Analyze"}
                </span>
              </span>
            </button>
          </div>

          {analysis && (
            <div className="analysis-result">
              <h3>
                <span className="check-icon">✓</span>
                Analysis Result
              </h3>

              {(() => {
                console.log(
                  "🎨 Rendering analysis component with:",
                  analysis.substring(0, 100)
                );
                const parsedAnalysis = parseAnalysisResponse(analysis);
                console.log(
                  "🎨 Parsed analysis for rendering:",
                  parsedAnalysis
                );

                return (
                  <div className="analysis-content">
                    {/* Match Score Section */}
                    <div className="match-score-section">
                      <div className="match-score-container">
                        <span className="match-label">Match Score:</span>
                        <span className="match-percentage">
                          {parsedAnalysis.matchScore}
                        </span>
                      </div>
                    </div>

                    {/* Strengths Section */}
                    <div className="suggestions-section">
                      <h4>Strengths:</h4>
                      {parsedAnalysis.strengths.length > 0 ? (
                        parsedAnalysis.strengths.map((item, i) => (
                          <div key={i} className="suggestion-item">
                            <span className="lightning-icon">✓</span>
                            <span className="suggestion-text">{item}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "#9ca3af" }}>
                          No strengths identified.
                        </p>
                      )}
                    </div>

                    {/* Weaknesses Section */}
                    <div className="suggestions-section">
                      <h4>Weaknesses:</h4>
                      {parsedAnalysis.weaknesses.length > 0 ? (
                        parsedAnalysis.weaknesses.map((item, i) => (
                          <div key={i} className="suggestion-item">
                            <span className="lightning-icon">⚠</span>
                            <span className="suggestion-text">{item}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "#9ca3af" }}>
                          No major weaknesses found.
                        </p>
                      )}
                    </div>

                    {/* Suggestions Section */}
                    <div className="suggestions-section">
                      <h4>Suggestions:</h4>
                      {parsedAnalysis.suggestions.length > 0 ? (
                        parsedAnalysis.suggestions.map((item, i) => (
                          <div key={i} className="suggestion-item">
                            <span className="lightning-icon">⚡</span>
                            <span className="suggestion-text">{item}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: "#9ca3af" }}>
                          No suggestions provided.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
