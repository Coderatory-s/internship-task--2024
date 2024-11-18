const express = require("express");
const app = express();
const port = 4010;

const routes = [
  {
    routeName: "Route 1",
    passengers: [
      { name: "Alice", pickup: "Stop A", destination: "Stop D" },
      { name: "hacker", pickup: "Stop B", destination: "Stop C" },
      { name: "Noora", pickup: "Stop ", destination: "Stop C" },
      { name: "Bob", pickup: "Stop B", destination: "Stop D" },
      { name: "Arjun", pickup: "Stop D", destination: "Stop E" },
      { name: "Alisha", pickup: "Stop B", destination: "Stop F" },
      { name: "Amna", pickup: "Stop A", destination: "Stop G" },
      { name: "wednesday", pickup: "Stop H", destination: "Stop I" },
      { name: "Bismah", pickup: "Stop B", destination: "Stop C" },
      { name: "Sheheryar", pickup: "Stop A", destination: "Stop B" },
      { name: "Alina", pickup: "Stop C", destination: "Stop D" },
      { name: "Fasih", pickup: "Stop D", destination: "Stop K" },
      { name: "Yariq", pickup: "Stop A", destination: "Stop D" },
      { name: "Sakina", pickup: "Stop A", destination: "Stop C" },
    ],
  },
];

// New vehicle data
const vehicles = [
  { vehicleId: 1, capacity: 4, currentPassengers: [] },
  { vehicleId: 2, capacity: 4, currentPassengers: [] },
];

// Graph representation of stops and distances
const graph = {
  "Stop A": { "Stop B": 5, "Stop C": 2 },
  "Stop B": { "Stop C": 5, "Stop D": 1 },
  "Stop C": { "Stop D": 2, "Stop E": 6 },
  "Stop H": { "Stop I": 6, "Stop J": 2 },
  "Stop D": { "Stop F": 1, "Stop Z": 2 },
};

// Dijkstra's algorithm to find the shortest path and total distance
function dijkstra(start, end) {
  const distances = {};
  const previous = {};
  const queue = [];

  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    queue.push(node);
  }
  distances[start] = 0;

  while (queue.length > 0) {
    const closestNode = queue.reduce((closest, node) => {
      return distances[node] < distances[closest] ? node : closest;
    });

    if (closestNode === end) {
      const path = [];
      let totalDistance = distances[closestNode]; // Get the total distance
      let currentNode = closestNode;
      while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
      }
      return { path, totalDistance }; // Return the path and total distance
    }

    queue.splice(queue.indexOf(closestNode), 1);

    for (const neighbor in graph[closestNode]) {
      const alt = distances[closestNode] + graph[closestNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = closestNode;
      }
    }
  }

  return { path: [], totalDistance: Infinity }; // Return empty path and infinite distance if no path found
}

// Exploratory Data Analysis Function
function analyzeData(routes) {
  const passengerCount = routes.reduce(
    (acc, route) => acc + route.passengers.length,
    0
  );
  const destinations = {};

  routes.forEach((route) => {
    route.passengers.forEach((passenger) => {
      destinations[passenger.destination] =
        (destinations[passenger.destination] || 0) + 1;
    });
  });

  return {
    totalPassengers: passengerCount,
    destinationStats: destinations,
  };
}

function trafficPooling(routes, vehicles, targetDestination) {
  for (let route of routes) {
    console.log(
      `Checking ${route.routeName} for passengers going to ${targetDestination}...`
    );

    for (let passenger of route.passengers) {
      if (passenger.destination === targetDestination) {
        let vehicleAssigned = false;

        // Find the shortest path for the passenger from pickup to destination
        const { path: shortestPath, totalDistance } = dijkstra(
          passenger.pickup,
          targetDestination
        );

        // Find a vehicle with available capacity
        for (let vehicle of vehicles) {
          if (vehicle.currentPassengers.length < vehicle.capacity) {
            vehicle.currentPassengers.push({
              ...passenger,
              path: shortestPath, // Attach the shortest path to the passenger
              totalDistance, // Attach the total distance (radius) to the passenger
              radius: totalDistance, // Add radius explicitly
            });
            console.log(
              `Picked up ${passenger.name} from ${
                passenger.pickup
              } heading to ${passenger.destination} in Vehicle ${
                vehicle.vehicleId
              }. Path: ${shortestPath.join(
                " -> "
              )}. Total Distance (Radius): ${totalDistance}`
            );
            vehicleAssigned = true;
            break;
          }
        }

        if (!vehicleAssigned) {
          console.log(
            `No available vehicles for ${passenger.name}. All vehicles are full.`
          );
        }
      }
    }
  }

  return vehicles;
}

app.get("/traffic-pooling", (req, res) => {
  const targetDestination = req.query.destination || "Stop D";

  // Perform traffic pooling
  const vehiclesWithPassengers = trafficPooling(
    routes,
    vehicles,
    targetDestination
  );

  // Perform EDA
  const edaResults = analyzeData(routes);

  res.json({
    message: `Traffic pooling complete for destination: ${targetDestination}`,
    vehicles: vehiclesWithPassengers,
    eda: edaResults,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

// const express = require("express");
// const app = express();
// const port = 4010;

// const routes = [
//   {
//     routeName: "Route 1",
//     passengers: [
//       { name: "Alice", pickup: "Stop A", destination: "Stop C" },
//       { name: "hacker", pickup: "Stop A", destination: "Stop C" },
//       { name: "Noora", pickup: "Stop A", destination: "Stop C" },
//       { name: "Bob", pickup: "Stop B", destination: "Stop D" },
//       { name: "David", pickup: "Stop Y", destination: "Stop E" },
//       { name: "David", pickup: "Stop B", destination: "Stop F" },
//       { name: "David", pickup: "Stop A", destination: "Stop G" },
//       { name: "wednesday", pickup: "Stop Y", destination: "Stop C" },
//       { name: "David", pickup: "Stop Y", destination: "Stop C" },
//       { name: "David", pickup: "Stop A", destination: "Stop I" },
//       { name: "David", pickup: "Stop C", destination: "Stop D" },
//       { name: "David", pickup: "Stop D", destination: "Stop K" },
//       { name: "David", pickup: "Stop A", destination: "Stop C" },
//       { name: "David", pickup: "Stop A", destination: "Stop S" },
//     ],
//   },
// ];

// // New vehicle data
// const vehicles = [
//   { vehicleId: 1, capacity: 4, currentPassengers: [] },
//   { vehicleId: 2, capacity: 4, currentPassengers: [] },
// ];

// // Graph representation of stops and distances
// const graph = {
//   "Stop A": { "Stop B": 5, "Stop C": 2 },
//   "Stop B": { "Stop A": 5, "Stop D": 1 },
//   "Stop C": { "Stop A": 2, "Stop Y": 6 },
//   "Stop Y": { "Stop C": 6, "Stop D": 2 },
//   "Stop D": { "Stop B": 1, "Stop Y": 2 },
// };

// // Dijkstra's algorithm to find the shortest path and total distance
// function dijkstra(start, end) {
//   const distances = {};
//   const previous = {};
//   const queue = [];

//   for (const node in graph) {
//     distances[node] = Infinity;
//     previous[node] = null;
//     queue.push(node);
//   }
//   distances[start] = 0;

//   while (queue.length > 0) {
//     const closestNode = queue.reduce((closest, node) => {
//       return distances[node] < distances[closest] ? node : closest;
//     });

//     if (closestNode === end) {
//       const path = [];
//       let totalDistance = distances[closestNode]; // Get the total distance
//       let currentNode = closestNode;
//       while (currentNode) {
//         path.unshift(currentNode);
//         currentNode = previous[currentNode];
//       }
//       return { path, totalDistance }; // Return the path and total distance
//     }

//     queue.splice(queue.indexOf(closestNode), 1);

//     for (const neighbor in graph[closestNode]) {
//       const alt = distances[closestNode] + graph[closestNode][neighbor];
//       if (alt < distances[neighbor]) {
//         distances[neighbor] = alt;
//         previous[neighbor] = closestNode;
//       }
//     }
//   }

//   return { path: [], totalDistance: Infinity }; // Return empty path and infinite distance if no path found
// }

// // Exploratory Data Analysis Function
// function analyzeData(routes) {
//   const passengerCount = routes.reduce(
//     (acc, route) => acc + route.passengers.length,
//     0
//   );
//   const destinations = {};

//   routes.forEach((route) => {
//     route.passengers.forEach((passenger) => {
//       destinations[passenger.destination] =
//         (destinations[passenger.destination] || 0) + 1;
//     });
//   });

//   return {
//     totalPassengers: passengerCount,
//     destinationStats: destinations,
//   };
// }

// function trafficPooling(routes, vehicles, targetDestination) {
//   for (let route of routes) {
//     console.log(
//       `Checking ${route.routeName} for passengers going to ${targetDestination}...`
//     );

//     for (let passenger of route.passengers) {
//       if (passenger.destination === targetDestination) {
//         let vehicleAssigned = false;

//         // Find the shortest path for the passenger from pickup to destination
//         const { path: shortestPath, totalDistance } = dijkstra(
//           passenger.pickup,
//           targetDestination
//         );

//         // Find a vehicle with available capacity
//         for (let vehicle of vehicles) {
//           if (vehicle.currentPassengers.length < vehicle.capacity) {
//             vehicle.currentPassengers.push({
//               ...passenger,
//               path: shortestPath, // Attach the shortest path to the passenger
//               totalDistance, // Attach the total distance to the passenger
//             });
//             console.log(
//               `Picked up ${passenger.name} from ${
//                 passenger.pickup
//               } heading to ${passenger.destination} in Vehicle ${
//                 vehicle.vehicleId
//               }. Path: ${shortestPath.join(
//                 " -> "
//               )}. Total Distance: ${totalDistance}`
//             );
//             vehicleAssigned = true;
//             break;
//           }
//         }

//         if (!vehicleAssigned) {
//           console.log(
//             ` No available vehicles for ${passenger.name}. All vehicles are full.`
//           );
//         }
//       }
//     }
//   }

//   return vehicles;
// }

// app.get("/traffic-pooling", (req, res) => {
//   const targetDestination = req.query.destination || "Stop C";

//   // Perform traffic pooling
//   const vehiclesWithPassengers = trafficPooling(
//     routes,
//     vehicles,
//     targetDestination
//   );

//   // Perform EDA
//   const edaResults = analyzeData(routes);

//   res.json({
//     message: `Traffic pooling complete for destination: ${targetDestination}`,
//     vehicles: vehiclesWithPassengers,
//     eda: edaResults,
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`API listening on port ${port}`);
// });
