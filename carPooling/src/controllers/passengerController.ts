// src/controllers/passengerController.ts

import { Request, Response } from "express";
import { passengers } from "../data/staticData";

export const addPassenger = (req: Request, res: Response) => {
  const newPassenger = req.body;
  passengers.push(newPassenger); // Add new passenger to the static data array
  res.status(201).json({ message: "Passenger added", passenger: newPassenger });
};

export const findMatchingDrivers = (req: Request, res: Response) => {
  const { pickup, destination, radius } = req.body;

  // Simple matching logic based on static data
  const matchingDrivers = passengers.filter(
    (passenger) =>
      passenger.pickup === pickup &&
      passenger.destination === destination &&
      passenger.radius >= radius
  );

  res.status(200).json({ matchingDrivers });
};
