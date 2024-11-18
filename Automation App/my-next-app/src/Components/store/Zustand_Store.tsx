import {create } from 'zustand';
import { toast } from '@/hooks/use-toast'

import axios from 'axios';


export const useUserStore = create<any>((set , get) => ({
     form_array_data : [] ,
     work_flow_data  : [],
     gmail_array : [],
     one_workflow_data : [],
     run_loading : false,
     card_id : '',
     set_card_id : (id : any) => set({ card_id : id}),
     set_work_flow_data : (data : any) => set({ work_flow_data : data}),
     set_one_workflow_data : (data : any) => set({ one_workflow_data : data}),
     addForm: (newForm : any) => {
        set((state : any) => ({
            form_array_data: [...state.form_array_data, newForm], // Update the state with the new form
          }));
     },
     resetGmailArray: () => set({ gmail_array: [] }),
     resetForm_data : () => set({ form_array_data : []}),
     runLoading: (value : boolean) => set({ run_loading: value }),
     addEmail: (newEmail : any) => {
      set((state : any) => ({
        gmail_array: [...state.gmail_array, newEmail], // Update the state with the new form
        }));
     },
     remove_Email : (reEmail : any) => {
      set((state : any) => ({
        gmail_array: state.gmail_array.filter((e : any ) => e !== reEmail), // Remove email at specified index
      }));
     },
     post_data : async() => {
        const formArray = get().form_array_data;
        const removeEmptyValues = (obj: any) => {
          return Object.fromEntries(
            Object.entries(obj).filter(
              ([_, value]) => value !== "" && value !== false && !(Array.isArray(value) && value.length === 0)
            ) // Filter out empty values
          );
        };
            const data = formArray.map((item : any) => {
               return removeEmptyValues({
                 type: item.type,
                 email: item.email,
                 message: item.message,
                 subject: item.subject,
                 duration: item.duration,
                 to : item.to,
                 url : item.url,
                 title : item.title,
                 start_date : item.start_date,
                 spread_sheet_url :  item.spread_sheet_url, 
                 status : item.status,
                 file : item.file,
                 selected_platform : item.selected_platform,
                 google_reminder : item.google_reminder,
                 slack_reminder : item.slack_reminder,
                 google_drive : item.google_drive
               });
             });
             console.log(data);
            try {
              let a = await axios.post(`http://localhost:3000/v1/post_workflow`, data, {
                headers: {
                  accesstoken: localStorage.getItem('token')
                }
              });
              if (a.status === 200) {
                console.log(a);
                set({ form_array_data: [] })
                   set({run_loading :  false })
                toast({
                    title : "Your Work_Flow is Running",
                    description : `${new Date().toLocaleString()}`,
                })
              }
            } 
            catch (error) {
              console.log(error);
              toast({
                variant: "destructive",
                title : "Error to run workflow",
                description : `${new Date().toLocaleString()}`,
            })
            }
     }
}));

