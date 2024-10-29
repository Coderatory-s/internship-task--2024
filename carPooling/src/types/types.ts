export interface Driver {
  id: number;
  name: string;
  pickup: [number, number]; // lat, long as a tuple
  destination: [number, number];
  time: string;
  radius: number; // in kilometers
  ETA: string;
  vehicleType: string;
  availableSeats: number;
}

export interface Passenger {
  id: number;
  pickup: [number, number]; // lat, long as a tuple
  destination: [number, number];
  radius: number;
}
