
// /services/activityService.ts
import axios from "axios";
import { IActivity } from "@/app/leads/activities/types";

const API_URL = "http://localhost:3000/v1"; // Update with your actual API endpoint

export const logActivity = async (activityData: any) => {
  console.log("Sending activity data:", JSON.stringify(activityData, null, 2)); // Log the data being sent in a readable format
  try {
    const response = await axios.post(`${API_URL}/activities`, activityData);
    return response.data;
  } catch (error) {
    console.error("Error in logActivity function:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const fetchActivitiesByLeadId = async (leadId: string): Promise<IActivity[]> => {
  try {
    const response = await axios.get(`${API_URL}/activities`, { params: { leadId } }); // Pass leadId as a query parameter
    console.log("Fetching Activities", response.data);
    return response.data; // Ensure this returns the correct format
  } catch (error) {
    console.error("Error fetching activities: asdasd", error);
    throw new Error('Failed to fetch activities. Please try again later.'); // More user-friendly error
  }
};


export const deleteActivity = async (activityId: string) => {
  await axios.delete(`${API_URL}/activities/${activityId}`);
};

export const updateActivity = async (activityId: string, updatedData: any) => {
  const response = await axios.patch(`${API_URL}/activities/${activityId}`, updatedData);
  return response.data;
};