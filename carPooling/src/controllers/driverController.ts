// src/controllers/driverController.ts

import { Request, Response } from "express";
import { drivers } from "../data/staticData";

export const addDriver = (req: Request, res: Response) => {
  const newDriver = req.body;
  drivers.push(newDriver); // Add new driver to the static data array
  res.status(201).json({ message: "Driver added", driver: newDriver });
};

export const getMatchingPassengers = (req: Request, res: Response) => {
  const { pickup, destination, radius } = req.body;

  // Simple matching logic based on static data
  const matchingPassengers = drivers.filter(
    (driver) =>
      driver.pickup === pickup &&
      driver.destination === destination &&
      driver.radius >= radius
  );

  res.status(200).json({ matchingPassengers });
};
