const express = require('express');
const app = express();


const graph = {
     A: { B: 5, C: 10 },
     B: { A: 5, D: 20, C: 2 },
     C: { A: 10, B: 2, D: 15 },
     D: { B: 20, C: 15 }
 };
 
 const route_data = [];
 
 let a = (graph, start, end , pick) => {
     let visited = new Set();
     
     for (let element in graph) {
         let totalDistance = 0; 
         let route = {}; 
         
         for (let neighbor in graph[element]) {
           
             if (neighbor === end) {
                 route[neighbor] = graph[element][neighbor];
                 totalDistance += graph[element][neighbor];
             }
            
             else if (!visited.has(neighbor) && graph[neighbor][end]) {
                 route[neighbor] = graph[element][neighbor];
                 totalDistance += graph[element][neighbor];
             }
         }
 
        
         if (Object.keys(route).length > 0 && !visited.has(element)) {
             route_data.push({
                 route: route,
                 node: element,
                 distance: totalDistance
             });
             visited.add(element); 
         }
     }
       // short route filter karny ly liay
     let a  = route_data.filter((e) => {
         return  e.node  === start 
     });
     
     a.map((e) => {
        console.log(e);
         for (const key in e.route) {

             pick.find((el) => {
                 if( el === key){
                     e['user-match'] = `I Will pick you from  ${el}`
                     e['pick'] = el
                 }else{
                    e['user-not-match'] = `You are not in my Radius ${el}`
                 }
             });

         }
     });
    
    
     return a;

 }

 
 const time_distance = () => {
    let s = a(graph, 'B', 'D' , [ 'A' , 'C' , 'B']);
    console.log(s);
    s.forEach((r) => {
        for (const key in r.route) {
            if(key === r.pick){
                r['estimted_distance'] = Number(r.distance/r.route[key])
                r['percentage'] = Number(r.estimted_distance/r.distance*100)
                r['estimated time'] = Number(r.estimted_distance/20*60)
            }
        }
        console.log(` ${r.pick} Passenger :  I will pick you from ${r.pick} Route is ${JSON.stringify(r.route)}   Distance is ${r.estimted_distance} km Estimated Time is  ${r.estimted_distance} minutes  success Level is ${r.percentage}%`); 

        
    })
 }
 time_distance()


// const graph = {
//     A: { B: 5, C: 10 },
//     B: { A: 5, D: 20, C: 2 },
//     C: { A: 10, B: 2, D: 15 },
//     D: { B: 20, C: 15 }
//   };
  
//   // Function to find the shortest path using Dijkstra's algorithm
//   const findShortestPath = (graph, start, end) => {
//     let distances = {};
//     let prevNodes = {};
//     let visited = new Set();
//     let priorityQueue = [[start, 0]];
  
//     // Initialize distances and prevNodes
//     for (let node in graph) {
//       distances[node] = Infinity;
//       prevNodes[node] = null;
//     }
//     distances[start] = 0;
  
//     while (priorityQueue.length > 0) {
//       // Sort the queue based on distance, then remove the node with minimum distance
//       priorityQueue.sort((a, b) => a[1] - b[1]);
//       let [currentNode, currentDistance] = priorityQueue.shift();
  
//       // Mark the current node as visited
//       if (visited.has(currentNode)) continue;
//       visited.add(currentNode);
  
//       // Loop through neighbors
//       for (let neighbor in graph[currentNode]) {
//         let newDistance = currentDistance + graph[currentNode][neighbor];
//         if (newDistance < distances[neighbor]) {
//           distances[neighbor] = newDistance;
//           prevNodes[neighbor] = currentNode;
//           priorityQueue.push([neighbor, newDistance]);
//         }
//       }
//     }
  
//     // Build the shortest path from end to start
//     let path = [];
//     for (let at = end; at !== null; at = prevNodes[at]) {
//       path.push(at);
//     }
//     path.reverse();
  
//     return { path, distance: distances[end] };
//   };
  
//   // Main algorithm to pick users and calculate the route
//   const a = (graph, start, end, pick) => {
//     const { path, distance } = findShortestPath(graph, start, end);
//     let pickedUsers = [];
//     let pickUpPoints = [];
//     let notPickedUsers = [];
  
//     // Check which users are on the route
//     for (let node of path) {
//       if (pick.includes(node)) {
//         pickedUsers.push(node);
//       }
//     }
  
//     // Identify users not picked
//     notPickedUsers = pick.filter(user => !pickedUsers.includes(user));
  
//     // Calculate estimated distance and time for each picked user
//     pickedUsers.forEach((user) => {
//       let userIndex = path.indexOf(user);
//       let distanceToUser = 0;
  
//       // Calculate distance to the user
//       for (let i = 0; i < userIndex; i++) {
//         distanceToUser += graph[path[i]][path[i + 1]];
//       }
  
//       // Calculate estimated time and success percentage
//       let estimatedTime = (distanceToUser / 20) * 60; // Assuming 20 km/h speed
//       let successPercentage = (pickedUsers.length / pick.length) * 100;
  
//       pickUpPoints.push({
//         user: user,
//         distanceToUser: distanceToUser,
//         estimatedTime: estimatedTime,
//         successPercentage: successPercentage,
//         message: `I will pick you from ${user}`
//       });
//     });
  
//     // Add message for users not picked up
//     notPickedUsers.forEach((user) => {
//       pickUpPoints.push({
//         user: user,
//         message: `You are not in my route, ${user} node Passenger`
//       });
//     });
  
//     return pickUpPoints;
//   };
  
//   // Function to print the results
//   const time_distance = () => {
//     let pickUpData = a(graph, 'B', 'D', ['A', 'C', 'B']);
//     pickUpData.forEach((data) => {
//       if (data.distanceToUser !== undefined) {
//         console.log(`I will pick you from ${data.user} Route. Distance is ${data.distanceToUser} km. Estimated Time is ${data.estimatedTime} minutes. Success Level is ${data.successPercentage}%.`);
//       } else {
//         console.log(data.message);
//       }
//     });
//   };
  
//   time_distance();
  


app.listen(3000, () => {
     console.log('Server is running on port 3000')
})
