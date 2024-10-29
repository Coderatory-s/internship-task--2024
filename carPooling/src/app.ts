// src/app.ts

import express from "express";
import driverRoutes from "./routes/driverRoutes";
import passengerRoutes from "./routes/passengerRoutes";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/driver", driverRoutes); // Driver routes
app.use("/passenger", passengerRoutes); // Passenger routes

app.get("/", (req, res) => {
  res.send("Welcome to the Carpooling API");
});

export default app;
