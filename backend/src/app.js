import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.origin,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Import routes
import employeeRoutes from "./routes/employee.routes.js";

// Route declarations (prefix routes)
app.use("/api", employeeRoutes);

export default app;
