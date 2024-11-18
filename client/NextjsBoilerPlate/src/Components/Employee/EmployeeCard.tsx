/* eslint-disable @next/next/no-img-element */
// EmployeeCard.tsx
import React from 'react';

interface EmployeeCardProps {
  id: string;
  name: string;
  position: string;
  email: string;
  profileImageUrl: string;
  onViewProfile: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  position,
  email,
  profileImageUrl,
  onViewProfile,
}) => {
  return (
    <div className="max-w-xs w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <img src={profileImageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
        <p className="text-sm text-gray-600 mt-2">{email}</p>
      </div>
      <div className="p-4 bg-gray-100">
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => onViewProfile(id)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
