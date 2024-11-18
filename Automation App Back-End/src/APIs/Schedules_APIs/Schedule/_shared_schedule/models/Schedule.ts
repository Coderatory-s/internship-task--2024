// models/Workflow.js
import mongoose, { Schema } from 'mongoose';
import  {IWorkflow} from '../types/Schedume_model'


const TaskSchema = new mongoose.Schema({
  type: {
    type: String,
    required : true
  },
  email: String,
  subject: String,
  message: String,
  url : String,
  to: {
    type: [String], // Array of strings
    default: undefined, // Avoid saving an empty array
  },
  duration: Date,
  title : String,
  start_date : Date,
  status : String,
  taskStatus: {
    type: String,
    enum: ['Failed', 'Processing', 'Completed'],
    required: true, // Optional: enforce that taskStatus must be set
    default: 'Processing' // Optional: set a default status
  },
  spread_sheet_url : String,
  file : {
     type : String,
  },
  selected_platform : {
    type  : [String],
    default : undefined
  },
  google_reminder : {
    type  : Boolean
  },
  slack_reminder : {
    type  : Boolean
  },
  google_drive : {
    type : Boolean
  }
});

const WorkflowSchema: Schema<IWorkflow> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [TaskSchema], // Store an array of task objects
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);

