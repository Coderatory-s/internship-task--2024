import React from "react";
import Main from "../components/Main/Main";

const Dashboards = () => {
  return (
    <Main>
      <h1>Welcome to Your Dashboard</h1>
      <p>Your one-stop overview for all your tasks, projects, and performance.</p>

      <div>
        <h2>Your Stats</h2>
        <p>Quick overview of your recent activity and progress.</p>
        <ul>
          <li>
            <strong>Total Tasks:</strong> 15
          </li>
          <li>
            <strong>Completed Tasks:</strong> 10
          </li>
          <li>
            <strong>Pending Tasks:</strong> 5
          </li>
        </ul>
      </div>

      <div>
        <h2>Your Projects</h2>
        <p>Keep track of your ongoing projects and deadlines.</p>
        <ul>
          <li>Project A - Deadline: 2024-11-30</li>
          <li>Project B - Deadline: 2024-12-05</li>
          <li>Project C - Deadline: 2024-12-15</li>
        </ul>
      </div>

    </Main>
  );
};

export default Dashboards;
