import  {ISchemaModel}  from '../types/Schedume_model';
import { parse , isValid } from 'date-fns'; // date-fns ko import karna
import servies from '../../services/services';
import services from '../../services/services';

export default {
     
     get_services : async() => {
      try {
        let d = await services.get_all_data();
        return d; 
      } catch (error : any) {
        throw error; // Throw the error instead of returning it
      }
     },
     get_single_service : async(body : any) => {
        try {
          const { type, job_position, participants, assing_to, interviewer, meeting_room, date, start_time, end_time, description, host, status } = body;
          if(!body  || Object.keys(body).length === 0){
              throw new Error('No data provided');
          }
            // Create a dynamic query object based on the provided body data
  const query: any = {};

  // Dynamically add filters if provided in req.body
    if (type) query.type = type; // Fix: Add to query, not body
    if (job_position) query.job_position = job_position; // Fix: Add to query
    if (participants) query.participants = { $in: participants }; // Supports array of participants
    if (assing_to) query.assing_to = { $in: assing_to }; // Supports array of assigned users
    if (interviewer) query.interviewer = interviewer; // Fix: Add to query
    if (meeting_room) query.meeting_room = meeting_room; // Fix: Add to query
    if (date) query.date = new Date(date); // Filter by exact date
    if (start_time) query.start_time = { $gte: new Date(start_time) }; // Filter schedules starting after or at a specific time
    if (end_time) query.end_time = { $lte: new Date(end_time) }; // Filter schedules ending before or at a specific time
    if (description) query.description = { $regex: description, $options: 'i' }; // Case-insensitive search
    if (host) query.host = host; // Fix: Add to query
    if (status) query.status = status; // Fix: Add to query

     const d = await servies.get_data(query);
            return d;
        } catch (error) {
            throw error;
        }
     },

     post_services :  async(body : ISchemaModel) => {
           try {   
              if(!body  || Object.keys(body).length === 0){
                  throw new Error('No data provided');
              }
              console.log(body.start_time);
               const parsedStartTime = parse(body.start_time, 'dd-MM-yy', new Date());
               console.log(parsedStartTime)
               const parsedEndTime = parse(body.end_time, 'dd-MM-yy', new Date());
               if (!isValid(parsedStartTime) || !isValid(parsedEndTime)) {
                throw new Error('Invalid date format');
              }
              let d = await servies.post_data(body, parsedStartTime, parsedEndTime)
                return d;
           } catch (error) {
             throw error;
           }
     },
     update_services : async( id : string , body : ISchemaModel | any ) => {
          try {  
             if(!body || Object.keys(body).length === 0){
                  throw new Error('No data provided');
              }
              let d = await services.update_data(id , body);
             return d;
          } catch (error) {
             throw error;
          }
     },
     delete_services : async( id : string) => {
      try {
        let d = await services.delete_data(id);   
         return d;
      } catch (error) {
         throw error;
      }
     }
}