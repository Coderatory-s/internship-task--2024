
import Schedule_DB from "../_shared_schedule/models/Schedule";

export default {
     get_all_data : async() => {
          try {
            const data = await Schedule_DB.find({}).populate('participants' , 'name');
            if(!data || data.length === 0){
                throw new Error('No data found'); 
              }
            return data;
          } catch (error) {
            throw error;
          }
     },
     get_data : async(query : any) => {
        try {
            const schedules = await Schedule_DB.find(query).populate('participants' , 'name').limit(100);;
            if(!schedules || schedules.length === 0) {
                throw new Error('No data found');  
             }
            return schedules;
        } catch (error) {
            throw error
        }
     },
     post_data : async(body : any, parsedStartTime : Date, parsedEndTime : Date) => {
        try { 
            const newSchedule = new Schedule_DB({
                ...body,
                start_time: parsedStartTime,
                end_time: parsedEndTime
            });
            let a =   await newSchedule.save();
            if(!a){
                throw new Error('Failed to save schedule');
            }
            return a;
        } catch (error) {
            throw error;
        }
     },
     update_data : async(id : string , body : any) => {
         try {
            const updatedSchedule = await Schedule_DB.findByIdAndUpdate(
                {_id : id},
               { $set: body },  
               { new: true, runValidators: true }
             );
             if (!updatedSchedule) {
                throw new Error('Schedule not found');
             }
             return updatedSchedule;
         } catch (error) {
            throw error;
         }
     },
     delete_data : async(id : string) => {
         try {
            const deletedSchedule = await Schedule_DB.findByIdAndDelete({_id : id});
            if (!deletedSchedule) {
              throw new Error('Delete not found');
            }
            return deletedSchedule;
         } catch (error) {
            throw error;
         }
     }
}