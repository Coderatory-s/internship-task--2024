/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '../app/globals.css';
import EmployeeProfile from '@/Components/Employee/EmployeeProfile';
import Navbar from '@/Components/Navbar/Navbar';
import EmployeeCard from '../Components/Employee/EmployeeCard'

const Profile: React.FC = () => {

    const handleViewProfile = (id: string) => {
        console.log(`View profile for employee with ID: ${id}`);
      
    };

    return (
        <>
            <Navbar />
            <EmployeeCard 
                id={''} 
                name={''} 
                position={''} 
                email={''} 
                profileImageUrl={''} 
                onViewProfile={handleViewProfile} 
            />
            <EmployeeProfile />
        </>
    );
};

export default Profile;

