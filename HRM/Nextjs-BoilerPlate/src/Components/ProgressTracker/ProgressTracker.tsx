import React, { useState } from 'react';

const CreateProgressTracker: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the progress data according to the schema
    const progressData = { taskName, progress, status, comments };

    try {
      setLoading(true);
      setErrorMessage('');

      const response = await fetch('http://localhost:3000/progress/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Progress saved:', data);
        // Optionally reset the form
        setTaskName('');
        setProgress(0);
        setStatus('');
        setComments('');
        alert('Progress saved successfully!');
      } else {
        const message = data.message || 'Failed to save progress';
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage((error as Error).message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value < 0 || value > 100 || isNaN(value)) {
      setProgress(0); // Or keep the previous value if invalid
    } else {
      setProgress(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Track Progress</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-700 font-medium">Task Name</label>
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
          <label htmlFor="progress" className="block text-gray-700 font-medium">Progress (%)</label>
          <input
            type="number"
            id="progress"
            value={progress}
            onChange={handleProgressChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter progress percentage"
            max={100}
            min={0}
            required
          />
        </div>
        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium">Status</label>
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
        <div className="mb-6">
          <label htmlFor="comments" className="block text-gray-700 font-medium">Comments</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter additional comments (optional)"
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Progress'}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateProgressTracker;
