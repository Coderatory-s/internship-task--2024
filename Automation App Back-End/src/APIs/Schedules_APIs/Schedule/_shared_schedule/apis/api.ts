import axios from "axios"
export default  {
     
     
     fetch_calendar : async( title  : any , message : any , start_date : any , end_date : any) => {
        try {
            let calendar = await axios.post(`http://localhost:3000/calendar_events` , {
                title : title ,
                description : message ,
                start_date : start_date ,
                end_date : end_date  ,
            })
             console.log(calendar);
            if(calendar.status === 200){
                return calendar.data;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
     }
}