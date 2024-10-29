import Activity from '../models/activityModel';

// Create a new activity
export const createActivity = async (activityData: any) => {
  const activity = new Activity(activityData);
  return await activity.save();
};

// Get activity by ID
export const getActivityById = async (id: string) => {
  return await Activity.findById(id); // Assuming you are using Mongoose
};

// Get all activities
export const getAllActivities = async () => {
  return await Activity.find(); // Retrieves all activities
};

// Update activity by ID
export const updateActivity = async (id: string, updateData: any) => {
  return await Activity.findByIdAndUpdate(id, updateData, { new: true }); // Updates and returns the updated document
};

// Delete activity by ID
export const deleteActivity = async (id: string) => {
  return await Activity.findByIdAndDelete(id); // Deletes the activity and returns it
};

// You can add other service methods as needed
