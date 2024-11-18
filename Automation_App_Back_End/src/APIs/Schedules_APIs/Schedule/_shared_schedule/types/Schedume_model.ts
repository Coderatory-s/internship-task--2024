import  mongoose , { Document } from "mongoose";
// import  {Multer}  from 'multer';

export interface Task {
  _id? : string,
  type: 'Gmail' | 'Slack_Notification' | 'Google_Sheets' | 'Google_Calendar' | 'Linked_in' | 'Youtube' | 'Facebook' | 'Instagram' | 'Video', // Add other types as needed
  email?: string,
  subject?: string,
  message?: string,
  url? : string,
  to? : string[],
  duration?: Date,
  title? : String,
  start_date? : Date,
  spread_sheet_url? : string,
  status? : string,
  taskStatus :  'Completed' | 'Processing' | 'Failed' , 
  file? : string,
  selected_platform? : string[],
  google_reminder? : boolean,
  slack_reminder? : boolean,
  google_drive? : boolean
  // Other task-specific fields
} 

export interface IWorkflow extends Document {
  userId: mongoose.Schema.Types.ObjectId,
  tasks: Task[],
  createdAt: Date,
}

declare global {
    namespace Express {
        interface Request {
            authenticatedUser?: any; // 'any' allows for maximum flexibility, but no type safety
            // file?: Express.Multer.File; // Use the correct type from Multer
        }
    }
}



