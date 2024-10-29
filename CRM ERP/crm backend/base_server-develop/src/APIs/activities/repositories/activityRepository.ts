// /src/features/activities/repositories/activityRepository.ts
import Activity from '../models/activityModel';
import { IActivity } from '../models/activityModel';

export const createActivity = async (activityData: IActivity): Promise<IActivity> => {
  const activity = new Activity(activityData);
  return await activity.save();
};

export const getActivityById = async (id: string): Promise<IActivity | null> => {
  return await Activity.findById(id).populate('leadId'); // Populate to get lead details if necessary
};

export const getAllActivities = async (): Promise<IActivity[]> => {
  return await Activity.find().populate('leadId');
};

export const updateActivity = async (id: string, updateData: Partial<IActivity>): Promise<IActivity | null> => {
  return await Activity.findByIdAndUpdate(id, updateData, { new: true }).populate('leadId');
};

export const deleteActivity = async (id: string): Promise<IActivity | null> => {
  return await Activity.findByIdAndDelete(id);
};
