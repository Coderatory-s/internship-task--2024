import React, { useEffect, useState } from "react";
import axios from "axios";

interface Candidate {
  _id: string;
  name: string;
  email: string;
  position: string;
  status: string;
}

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("/api/candidates"); // Replace with actual API endpoint
        setCandidates(response.data);
      } catch (err: unknown) {
        setError("Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Candidate List</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td className="border px-4 py-2">{candidate.name}</td>
              <td className="border px-4 py-2">{candidate.email}</td>
              <td className="border px-4 py-2">{candidate.position}</td>
              <td className="border px-4 py-2">{candidate.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;

