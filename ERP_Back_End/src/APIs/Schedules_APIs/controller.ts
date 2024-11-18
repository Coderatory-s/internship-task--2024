import {  Request , Response } from "express";
import post from "./Schedule/_shared_schedule/repo/post_schdule";
import httpResponse from '../../handlers/httpResponse';

export default {
    // this os fro get all_data
    get_schedule : async( req : Request , res: Response) : Promise<void> => {
            try {
                if(req){
                    
                }
                const data =  await post.get_services();
                // httpResponse(res , req , 200 , "Data Found" , data)
                 res.status(200).json({ message: "Data Found" ,  data : data });
            } catch (error : any) {
                res.status(400).json({ message: error.message});
            }
    },

     // this for filter all type of query  
    get_one_schedule : async(req : Request , res: Response ) => {
        try {
            const data =  await post.get_single_service(req.body);
           
            // httpResponse(res , req , 200 , "Data Found" , data)
            res.status(200).json({ message: "Data Found" ,  data : data });
        } catch (error : any) {
            res.status(400).json({ message: error.message });
        }
},
    post_schedule : async(req : Request , res : Response) : Promise<void> =>  {
        try {
             const data = await  post.post_services(req.body);
            //  let a  = req.authenticatedUser;
            //  console.log(a);
             httpResponse(res , req , 201 , "Schedule Posted Successfully" , data)
            //  res.status(201).json({ message: "Schedule Posted Successfully", data : data});
        } catch (error : any) {
             res.status(400).json({ message: error.message });
        }
    },
    schedule_update : async(req : Request , res : Response) => {
        try {
            const {id} = req.params;
             const data = await  post.update_services(id , req.body);
            //  res.status(201).json({ message: "Schedule Updated Successfully", data : data});
             httpResponse(res , req , 201 , "Schedule Updated Successfully" , data)
        } catch (error : any) {
             res.status(400).json({ message: error.message });
        }
    },
    schedule_delete : async(req : Request , res : Response) => {
        try {
            const {id} = req.params;
             await  post.delete_services(id);
            //  res.status(201).json({ message: "Schedule Deleted Successfully"});
             httpResponse(res , req , 201 , "Schedule Deleted  Successfully" , null);
        } catch (error : any) {
             res.status(400).json({ message: error.message });
        }
    },
   
}