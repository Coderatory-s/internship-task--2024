// src/data/staticData.ts

interface Driver {
  id: number;
  pickup: string;
  destination: string;
  time: string;
  radius: number; // in kilometers
  ETA: string; // Estimated Time of Arrival
}

interface Passenger {
  id: number;
  pickup: string;
  destination: string;
  time: string;
  radius: number; // in kilometers
}

const drivers: Driver[] = [
  {
    id: 1,
    pickup: "A",
    destination: "B",
    time: "10:00",
    radius: 5,
    ETA: "15 min",
  },
  {
    id: 2,
    pickup: "C",
    destination: "D",
    time: "10:30",
    radius: 10,
    ETA: "20 min",
  },
  {
    id: 3,
    pickup: "E",
    destination: "F",
    time: "11:00",
    radius: 8,
    ETA: "10 min",
  },
  // Add more drivers
];

const passengers: Passenger[] = [
  { id: 1, pickup: "A", destination: "B", time: "10:00", radius: 5 },
  { id: 2, pickup: "C", destination: "D", time: "10:30", radius: 10 },
  { id: 3, pickup: "E", destination: "F", time: "11:00", radius: 8 },
  // Add more passengers
];

export { drivers, passengers };
