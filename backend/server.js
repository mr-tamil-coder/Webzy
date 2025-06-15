const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const workSpaceRoutes = require("./src/routes/workspace");
const geminiRoutes = require("./src/routes/gemini");
const connectDB = require("./src/config/db");

console.log("Home", process.env.GEMINI_API_KEY);

const app = express();
//Auth Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/workspace", workSpaceRoutes);
app.use("/api/gemini", geminiRoutes);
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Db cannot be connected");
  });
