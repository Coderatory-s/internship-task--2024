import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../redux";
import Main from "../components/Main/Main";
import { User } from "../utils/API/user_API";

// Interface for the component props
export interface PeopleProps {
  currentUser: User; // Current user data from Redux
}

const People: React.FC<PeopleProps> = ({ currentUser }) => {
  const [userInfo, setUserInfo] = useState({
    name: currentUser.firstname || "John Doe",
    role: currentUser.role || "Project Manager",
    department: currentUser.department || "Project Management",
  });


  useEffect(() => {
    setUserInfo({
      name: currentUser.firstname || "John Doe",
      role: currentUser.role || "Project Manager",
      department: currentUser.department || "Project Management",
    });
  }, [currentUser]);

  return (
    <Main>
      <h1>Welcome, {userInfo.name}!</h1>
      <p>
        You are currently in the <strong>{userInfo.department}</strong> department, with the role of{" "}
        <strong>{userInfo.role}</strong>.
      </p>
      <p>Here you can manage your team, assign roles, and track employee progress.</p>
      <p>Start by adding new team members or reviewing the current team tasks.</p>

    </Main>
  );
};

// Map Redux state to component props
const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user, 
});

export default connect(mapStateToProps)(People);
