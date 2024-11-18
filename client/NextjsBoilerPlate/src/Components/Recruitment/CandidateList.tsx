import React, { useState } from 'react';
import axios from 'axios';

const CreateCandidateList: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/v1/recruitment/addCandidate', formData);
      console.log('Candidate added:', response.data);
      // Reset form data after submission
      setFormData({
        name: '',
        email: '',
        position: '',
        experience: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Candidate</h2>
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Experience (years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 font-semibold mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          rows={4}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCandidateList;
