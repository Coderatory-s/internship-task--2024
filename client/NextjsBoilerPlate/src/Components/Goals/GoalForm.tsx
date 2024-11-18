import React, { useState } from 'react';

const GoalForm: React.FC = () => {
  const [goalName, setGoalName] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); // Added Assignedto field
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const goalData = {
      title: goalName,
      description: goalDescription,
      dueDate: deadline,
      Assignedto: assignedTo, // Include Assignedto
      status,
    };

    try {
      const response = await fetch('http://localhost:3000/v1/goal/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Goal created successfully:', data);
        // Reset form
        setGoalName('');
        setGoalDescription('');
        setDeadline('');
        setAssignedTo(''); // Reset Assignedto field
        setStatus('');
      } else {
        console.error('Error creating goal:', data);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Create Goal Setting
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Goal Name */}
        <div className="mb-4">
          <label htmlFor="goalName" className="block text-gray-700 font-medium">
            Goal Name
          </label>
          <input
            type="text"
            id="goalName"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter goal name"
            required
          />
        </div>
        {/* Goal Description */}
        <div className="mb-4">
          <label
            htmlFor="goalDescription"
            className="block text-gray-700 font-medium"
          >
            Goal Description
          </label>
          <textarea
            id="goalDescription"
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter goal description"
            required
          />
        </div>
        {/* Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 font-medium">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Assigned To */}
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-gray-700 font-medium">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter person responsible"
            required
          />
        </div>
        {/* Status */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Goal Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
