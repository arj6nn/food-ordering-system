
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to User Service!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    service: "user-service",
    message: "User service is healthy",
  });
});

app.use("/users", userRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5001, () => {
    console.log("User Service running");
  });
};

startServer();
