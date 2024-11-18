import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "@/Components/Navbar/Navbar";  

interface Job {
  id: number;
  jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/recruitment/getCandidate');
        setJobs(response.data.jobs); // Ensure the response contains a jobs array
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>; 

  if (jobs.length === 0) return <p>No jobs available.</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="mt-2 text-gray-600">Department: {job.department}</p>
              <p className="mt-2 text-gray-600">Location: {job.location}</p>
              <p className="mt-2">{job.description}</p>
              <div className="mt-4">
                <p className="text-sm">Start Date: {new Date(job.startDate).toLocaleDateString()}</p>
                <p className="text-sm">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
              </div>
              <div className="mt-4">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
