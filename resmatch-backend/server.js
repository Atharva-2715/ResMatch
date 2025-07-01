const express = require("express");
const cors = require("cors");

// Remove the node-fetch import since we'll use built-in fetch
require("dotenv").config();

const app = express();
const port = 8000;

app.use(express.json());

app.use(cors({
  origin: "https://res-match.vercel.app/",
  credentials: true
}));


// Check if API key is loaded
console.log("🔑 GROQ_API_KEY loaded:", process.env.GROQ_API_KEY ? "✅ Yes" : "❌ No");
console.log("🔑 API Key preview:", process.env.GROQ_API_KEY?.substring(0, 10) + "...");

app.post("/analyze", async (req, res) => {
  console.log("📝 Received request:", req.body);
  
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing resume or job description" });
  }

  // Check API key
  if (!process.env.GROQ_API_KEY) {
    console.error("❌ No GROQ_API_KEY found in environment variables");
    return res.status(500).json({ 
      error: "GROQ_API_KEY not configured. Please add it to your .env file." 
    });
  }

  const prompt = `
Compare the following resume and job description. Return:
1. Match Score (0–100)
2. Key Strengths
3. Weaknesses
4. Suggestions to improve resume

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  try {
    console.log("🚀 Calling Groq API...");
    
    // Using built-in fetch (Node.js 18+)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a resume analysis expert." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const rawText = await response.text();
    console.log("📥 Groq response status:", response.status);
    console.log("📥 Groq response preview:", rawText.substring(0, 200) + "...");

    if (!response.ok) {
      console.error("❌ Groq API error:", rawText);
      
      // Parse error response if possible
      try {
        const errorData = JSON.parse(rawText);
        return res.status(500).json({ 
          error: `Groq API Error: ${errorData.error?.message || 'Unknown error'}` 
        });
      } catch {
        return res.status(500).json({ 
          error: `Groq API Error (${response.status}): ${rawText}` 
        });
      }
    }

    try {
      const data = JSON.parse(rawText);
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("❌ Incomplete response from Groq API:", data);
        return res.status(500).json({ error: "Incomplete response from Groq API" });
      }
      
      console.log("✅ Analysis complete");
      res.json({ analysis: data.choices[0].message.content });
    } catch (err) {
      console.error("❌ Failed to parse Groq JSON:", err.message);
      console.error("❌ Raw response:", rawText);
      res.status(500).json({ error: "Invalid JSON from Groq API" });
    }
  } catch (err) {
    console.error("❌ Network/Fetch error:", err.message);
    console.error("❌ Error stack:", err.stack);
    
    if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      res.status(500).json({ error: "Network error: Cannot reach Groq API. Check your internet connection." });
    } else {
      res.status(500).json({ error: `Failed to connect to Groq API: ${err.message}` });
    }
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "ResMatch Backend Server", 
    status: "running",
    groqApiKey: process.env.GROQ_API_KEY ? "configured" : "missing",
    nodeVersion: process.version,
    endpoints: {
      test: "GET /test",
      analyze: "POST /analyze"
    }
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is working!",
    groqApiKey: process.env.GROQ_API_KEY ? "configured" : "missing",
    nodeVersion: process.version
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🔑 GROQ API Key: ${process.env.GROQ_API_KEY ? '✅ Loaded' : '❌ Missing'}`);
  console.log(`📌 Node.js version: ${process.version}`);
});
