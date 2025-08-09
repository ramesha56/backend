
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes"); 
const dbConnect = require("./utils/dbConnect");

dotenv.config();
dbConnect();

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://hijab-styles-front.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
     
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
  });
}

module.exports = app;
