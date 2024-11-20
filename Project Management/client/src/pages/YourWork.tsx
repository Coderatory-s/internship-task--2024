import React from "react";
import Main from "../components/Main/Main";

const YourWork = () => {
  return (
    <Main>
      <h1>Welcome to Your Work Dashboard</h1>
      <p>Stay on top of your projects and tasks.</p>
      <p>Here is a summary of your current work:</p>

      <div>
        <h2>Your Tasks:</h2>
        <ul>
          <li>
            <strong>Complete project proposal</strong> - Due by 2024-11-21 - Status: In Progress
          </li>
          <li>
            <strong>Review design mockups</strong> - Due by 2024-11-23 - Status: Pending
          </li>
          <li>
            <strong>Prepare for client meeting</strong> - Due by 2024-11-25 - Status: Not Started
          </li>
        </ul>
      </div>

      <div>
        <h2>Your Projects:</h2>
        <p>Manage your ongoing projects and keep track of deadlines.</p>
        <ul>
          <li>Project A - Deadline: 2024-11-30</li>
          <li>Project B - Deadline: 2024-12-05</li>
          <li>Project C - Deadline: 2024-12-15</li>
        </ul>
      </div>
    </Main>
  );
};

export default YourWork;
