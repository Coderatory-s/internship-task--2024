// pages/progress-tracker/CreateProgressTracker.tsx


import React, { useState } from 'react';
import axios from 'axios';

const CreateProgressTracker: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const payload = { taskName, progress, status, comments };

    try {
      const response = await axios.post('http://localhost:3000/v1/progress/', payload);
      setMessage('Progress tracker saved successfully!');
      console.log('Response:', response.data);
      // Optionally clear the form
      setTaskName('');
      setProgress(0);
      setStatus('');
      setComments('');
    } catch (error) {
      setMessage('Failed to save progress tracker. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Track Progress</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-700 font-medium">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task name"
            required
          />
        </div>

        {/* Progress Percentage */}
        <div className="mb-4">
          <label htmlFor="progress" className="block text-gray-700 font-medium">
            Progress (%)
          </label>
          <input
            type="number"
            id="progress"
            value={progress}
            onChange={(e) => setProgress(Math.min(100, Math.max(0, parseInt(e.target.value))))}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter progress percentage"
            max={100}
            min={0}
            required
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="block text-gray-700 font-medium">
            Comments
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Add any comments or updates"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Progress'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgressTracker;
