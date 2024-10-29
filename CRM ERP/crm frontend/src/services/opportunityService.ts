import axios from "axios";
const API_URL = 'http://localhost:3000/v1';

export const getOpportunities = async () => {
  const response = await axios.get(`${API_URL}/opportunities`); // Adjust API endpoint if needed
  return response.data;
};


// Create new opportunity

export const createOpportunity = async (opportunityData: any) => {
  const response = await axios.post(`${API_URL}/opportunities`, opportunityData);
  return response.data;
};

export const getPipelineOpportunities = async () => {
  const response = await axios.get(`${API_URL}/opportunities`);
  return response.data.data;
};

export const updateOpportunityStage = async (id: string, stage: string) => {
  const response = await axios.put(`${API_URL}/opportunities/${id}`, { stage });
  return response.data;
};

