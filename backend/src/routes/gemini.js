const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const router = express.Router();

console.log("GEMINI_API_KEY", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Message is required" });
  }
  const contents = [{ role: "user", parts: [{ text: prompt }] }];
  const config = { responseMimeType: "text/plain" };

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    config,
    contents,
  });

  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }

  res.json({ output: result });
});

router.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const contents = [
    { role: "user", parts: [{ text: `Write code for:\n${prompt}` }] },
  ];
  const config = { responseMimeType: "application/json" };

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    config,
    contents,
  });

  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }
  const parsedResult = JSON.parse(result);

  res.json({ output: parsedResult });
});

module.exports = router;
