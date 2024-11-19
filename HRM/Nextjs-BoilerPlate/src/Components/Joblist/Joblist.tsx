import { useState,useEffect } from "react";
import axios from "axios";

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get("/api/jobs"); // Replace with your API endpoint
          setJobs(response.data);
        } catch (err: unknown) {
          setError("Failed to fetch jobs");
        } finally {
          setLoading(false);
        }
      };
  
      fetchJobs();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <h2>Job Listings</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Job Title</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Job Type</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="border px-4 py-2">{job.jobTitle}</td>
                <td className="border px-4 py-2">{job.department}</td>
                <td className="border px-4 py-2">{job.jobType}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">{new Date(job.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(job.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default JobList;