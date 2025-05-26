import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRouter from "./routes/transactions.route.js";
import job from "./cron.js";

dotenv.config();

const app = express();

if (process.env === "production") job.start();

app.use(cors());

// middleware
app.use(rateLimiter);
app.use(express.json());

// our custom simple middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is:", req.method);
//   next();
// });

const PORT = process.env.PORT || 5001;

app.length("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionsRouter);

initDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running on port 5001");
  });
});
