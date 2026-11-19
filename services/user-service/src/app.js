
import express from "express";

const app = express();

const PORT = 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to User Service!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "success",
    service: "user-service",
    message: "User service is healthy"
  });
});

app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    users: []
  });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});