import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import axios from 'axios';

const CreateJobPostForm: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/v1/recruitment/addCandidate', {
        jobTitle,
        department,
        jobType,
        location,
        description,
        startDate,
        endDate,
      });
      console.log('Job post created:', response.data);
      
      // Reset form data
      setJobTitle('');
      setDepartment('');
      setJobType('');
      setLocation('');
      setDescription('');
      setStartDate('');
      setEndDate('');

      // Redirect to Jobs Page
      router.push('/Jobs'); // Replace '/jobs' with your actual jobs page route
    } catch (error) {
      console.error('Error creating job post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg overflow-y-auto max-h-screen">
      <h2 className="text-2xl font-bold mb-6">Create Job Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter department"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter job location"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            rows={5}
            placeholder="Enter job description"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create Job Post
        </button>
      </form>
    </div>
  );
};

export default CreateJobPostForm;
