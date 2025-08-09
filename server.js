
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const reviewRoutes = require("./api/reviews");
// const dbConnect = require("./utils/dbConnect");

// dotenv.config();
// dbConnect();

// const app = express();

// app.use(cors());
// app.use(express.json());


// app.use("/api/reviews", reviewRoutes);

// //  Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// //  Only run app.listen in local development
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 5050;
//   app.listen(PORT, () => {
//     console.log(`Server running locally on http://localhost:${PORT}`);
//   });
// }


// module.exports = app;




const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reviewRoutes = require("./api/reviews");
const dbConnect = require("./utils/dbConnect");

dotenv.config();
dbConnect();

const app = express();

app.use(
  cors({
    origin: "https://hijab-styles-front.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Local run only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
  });
}

module.exports = app; // Required for Vercel
