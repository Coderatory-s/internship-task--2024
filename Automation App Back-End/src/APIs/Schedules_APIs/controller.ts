import {  Request , Response } from "express";
import Workflow from '../Schedules_APIs/Schedule/_shared_schedule/models/Schedule';
import { IWorkflow } from "./Schedule/_shared_schedule/types/Schedume_model";
import services from './Schedule/services/services';
import repo from './Schedule/_shared_schedule/repo/post_schdule';
// const fs = require('fs');
const PDFDocument = require('pdfkit');


export default {
    // this os fro get all_data
    get_schedule : async( req : Request , res: Response) : Promise<void> => {
            try {
                if(req){
                    console.log(req.authenticatedUser)
                }
                 res.status(200).json({ message : "Token Verified"});
            } catch (error : any) {
                res.status(400).json({ message: error.message});
            }
    },
    post_workflow : async( req : Request , res: Response) : Promise<void> => {
        try {
            const body :any = req.body;
            const userId : any = req.authenticatedUser._id
            let r = await services.save_work_flow_data(body , userId);
            res.status(200).send({message : 'Data Creatde' , data : r })
          } catch (error) {
            console.error(error);
            res.status(400).json({ success: false , message : error});
          }
    },
    get_workflow : async (req: Request, res: Response): Promise<void> => {
      try {
        const id  = req.authenticatedUser._id;
        const workflows: IWorkflow[] = await Workflow.find({ userId : id});
        res.status(200).json({ success: true, data : workflows });
      } catch (error) {
        console.error('Error fetching workflows:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    },
    create_token : async (req : Request , res : Response) => {
       try {
           const {id_token} = req.body;
           const {_id} = req.authenticatedUser;
            const all_token = await repo.exchage_token(id_token , _id); 
           res.status(200).send(all_token);
       } catch (error) {
          console.log(error);
          res.status(400).json({ message: 'Server Error' });
       }
    },
    calendar_events : async (userId : any , title : any ,  message :any , start_date : any ) => {
      try {         
          const all_token = await repo.find_auth_token( userId , title,  message, start_date);
           return all_token;
      } catch (error) {
         console.log(error);
      }
    },
    google_sheets_events : async( req : Request , res : Response) => {
           try{
                  const {_id} = req.authenticatedUser;
                   let sheets = await repo.lists_google_sheets(_id);
                   console.log(sheets);
                 res.status(200).send({success : true , data : sheets});
           }catch(error){
              console.log(error)
              res.status(400).json({ message: 'Server Error' , data  : error });
           }
    },
    get_workflow_one : async( req : Request , res : Response) => {
       try {
           let {id} = req.params;
          let a = await repo.get_one_workflow(id);
          res.status(200).send({success : true , data  : a});
       } catch (error) {
          res.status(500).send(error)
       }
    },
    generate_pdf : async(req : Request , res : Response) => {
      try{
        const {formData , doctype} = req.body; // data sent from frontend
        const docType =  doctype; // Extract docType from the request
        const doc = new PDFDocument();

        // Set the response type to application/pdf
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=generated-document.pdf');
      
        // Pipe the PDF output to the response
        doc.pipe(res);
      
        doc.fontSize(16).text(`${docType.charAt(0).toUpperCase() + docType.slice(1)}`, { align: 'center' });
        doc.moveDown(2);
        Object.keys(formData).forEach((fieldType) => {
          if (fieldType !== 'docType') {
            doc.fontSize(12).text(`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}:`, { continued: true });
            formData[fieldType].forEach((fieldValue : any, index : any) => {
              doc.fontSize(12).text(` ${fieldValue}`);
              if (index !== formData[fieldType].length - 1) {
                doc.moveDown(0.5);
              }
            });
            doc.moveDown(1);
          }
        });
      
        // Finalize the PDF and send it
        doc.end();

      }
      catch(e){
         console.log(e);
         res.status(400).send('Server error')
      }
    }
   
}