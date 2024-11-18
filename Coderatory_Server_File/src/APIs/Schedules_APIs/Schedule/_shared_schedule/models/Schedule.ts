import mongoose from "mongoose";
import {ISchemaModel} from '../types/Schedume_model'
// import {User} from '../../../../user/_shared/models/user.model'

// const Schema_Model = new mongoose.Schema<ISchemaModel>({
//       type  : {         
//          type : String,
//          required : true
//       },
//       job_position : {  
//          type : String,
//       },
//       participants : [{
//             type : String,
//          }],
//       interviewer : {
//          type : String,
//       },
//       meeting_room : {
//          type : String,
//       },
//       date : {
//         type: Date,
//         default: Date.now,  
//       },
//       start_time : {
//          type : String,
//       },
//       end_time : {
//         type : String,
//       },
//       description :{
//          type  : String
//       },
//       host : {
//          type : String,
//       },
//       status : {
//          type : String,
//          enum : ['Pending','Cancelled','Completed'],
//          default : 'Pending',
//       }
// } , {timestamps: true});

//  const Schedule_DB =  mongoose.model<ISchemaModel>("Schedules", Schema_Model);
//  export default Schedule_DB;


const Schema_Model = new mongoose.Schema<ISchemaModel>({
   type  : {         
      type : String,
      required : true
   },
   job_position : {  
      type : String,
   },
   participants : [{
         type : mongoose.Types.ObjectId,
         ref : 'User'
      }],
   interviewer : {
      type : String,
   },
   meeting_room : {
      type : String,
   },
   date : {
     type: Date,
     default: Date.now,  
   },
   start_time : {
      type : String,
   },
   end_time : {
     type : String,
   },
   description :{
      type  : String
   },
   host : {
      type : String,
   },
   status : {
      type : String,
      enum : ['Pending','Cancelled','Completed'],
      default : 'Pending',
   }
} , {timestamps: true});

const Schedule_DB =  mongoose.model<ISchemaModel>("Schedules", Schema_Model);
export default Schedule_DB;