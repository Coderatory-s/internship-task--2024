import mongoose , { Document  } from "mongoose";

// export interface ISchemaModel extends Document {
//     type?: string;
//     job_position?: string;
//     participants?: Array<string>;
//     interviewer?: string;
//     meeting_room?: string;
//     date: Date;
//     start_time: string;
//     end_time: string;
//     description?: string;
//     host?: string;
//     status?: 'Pending' | 'Cancelled' | 'Completed';
// }

export interface ISchemaModel extends Document {
    type?: string;
    job_position?: string;
    participants?: mongoose.Types.ObjectId[];
    interviewer?: string;
    meeting_room?: string;
    date: Date;
    start_time: string;
    end_time: string;
    description?: string;
    host?: string;
    status?: 'Pending' | 'Cancelled' | 'Completed';
}

declare global {
    namespace Express {
      interface Request {
        authenticatedUser?: any; // 'any' allows for maximum flexibility, but no type safety
      }
    }
}


