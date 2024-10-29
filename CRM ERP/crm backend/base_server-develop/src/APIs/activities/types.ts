// /src/features/activities/types.ts
import { Types } from 'mongoose'; // Import mongoose Types
import { IActivity } from './models/activityModel'; // Adjust the import path if necessary

export type ActivityType = 'Call' | 'Email' | 'Meeting';

export interface Activity extends IActivity {
  leadId: Types.ObjectId; // Use ObjectId type to match the IActivity interface
  activityType: ActivityType;
  description: string;
  dateTime: Date;
  assignedSalesRep: string;
}

export interface CreateActivityInput {
  leadId: Types.ObjectId; // Match the type with IActivity
  activityType: ActivityType;
  description: string;
  dateTime?: Date; // Optional, as it can default to now
  assignedSalesRep: string;
}
