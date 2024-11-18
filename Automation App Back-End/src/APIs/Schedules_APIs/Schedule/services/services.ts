
import Workflow from "../_shared_schedule/models/Schedule";
import { IWorkflow } from "../_shared_schedule/types/Schedume_model";
const node_cron = require("node-cron");
import controller from '../../controller';
import repo from '../_shared_schedule/repo/post_schdule';
const cloudinary = require('cloudinary'); 

cloudinary.v2.config({
  cloud_name: 'de2nzvcrd',
  api_key: '825669894714912',
  api_secret: 'oF8KTSpoHsYcBYiA7mo-pJDAgtA',
});

const uploadFileToCloudinary = async (filePath : any) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      {resource_type : 'raw' },
       (error : any, result : any) => {
      if (error) {
        return reject(error);
      }
      resolve( result?.secure_url); 
    });
  });
};

export default {
     save_work_flow_data : async(body : any , userId : any) => {
        try {
          const newBody = await Promise.all(
            body.map(async (task : any) => {
              if (
                task.file &&(task.file.startsWith("data:image/") || task.file.startsWith("data:video/") || task.file.startsWith("data:application/pdf")
                )
              ) {
                 try{
                  const uploadResponse : any = await uploadFileToCloudinary(task.file);
                  task.file = uploadResponse;
                 }
                 catch(e){
                   console.log(e)
                 }
              }
              
              return task;
            })
          );
          const workflow: IWorkflow = new Workflow({
            userId: userId,
            tasks: newBody,
          });
         await workflow.save();
            const get_workflow = await Workflow.find({_id : workflow._id });
            for (const workflow of get_workflow) {
              for (const task of workflow.tasks) {
                 try{

                  if (task.type === 'Gmail') {
                         if(task.start_date){
                          const date = new Date(task.start_date);
                          const now = new Date();
                          if(date > now){
                            const minutes = date.getMinutes() || 0;
                          const hours = date.getHours() || 0;
                          const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                          node_cron.schedule(cronExpression, async() => {
                             try{
                              await repo.sendResendEmail(task.email , task.to , task.subject , task.message);
                              if(task.slack_reminder){
                                await repo.sendSlackNotfication(task.url , task.message);
                              }
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Completed" } }
                              );
                             }
                             catch(e){
                              console.log(`node cron  ${e}`)
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                {
                                  $set: {
                                    "tasks.$.taskStatus": "Failed"
                                  },
                                }
                              );
                             }   
                          }); 
                          }else{
                            await repo.sendResendEmail(task.email , task.to , 'Reminder' , task.message);
                            if(task.slack_reminder){
                              await repo.sendSlackNotfication(task.url , task.message);
                            }
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }            
                         }else{
                            await repo.sendResendEmail(task.email , task.to , task.subject , task.message);
                            if(task.slack_reminder){
                              await repo.sendSlackNotfication(task.url , task.message);
                            }
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                         }          
                  }
                  else if (task.type === 'Slack_Notification') {
                      if(task.start_date){
                         const date = new Date(task.start_date);
                         const now = new Date();
                         if(date > now){
                          const minutes = date.getMinutes() || 0;
                          const hours = date.getHours() || 0;
                          const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                          node_cron.schedule(cronExpression, async() => {
                            try{
                              await repo.sendSlackNotfication(task.url , task.message);
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Completed" } }
                              );
                            }
                            catch(e){
                              console.log(e);
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                {
                                  $set: {
                                    "tasks.$.taskStatus": "Failed"
                                  },
                                }
                              );
                            }
                          });    
                         }else{
                          await repo.sendSlackNotfication(task.url , task.message);
                          if(task.google_reminder){
                            await repo.sendResendEmail(task.email , task.to , 'Reminder' , task.message);
                          }
                          await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                         }  
                     }else{
                          await repo.sendSlackNotfication(task.url , task.message);
                          await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                     } 
                  }
                  else if (task.type === 'Google_Calendar') {
                    if(task.google_reminder){
                      if(task.start_date){
                        const date = new Date(task.start_date);
                        const now = new Date();
                         if(date > now){
                          const minutes = date.getMinutes();
                          const hours = date.getHours();
                          const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                          node_cron.schedule(cronExpression, async() => {
                            try{
                              await repo.sendResendEmail(task.email , task.to , 'Sheet Updates' ,  task.message);
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Completed" } }
                              );
                            }
                            catch(e){
                              console.log(e)
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Failed" } }
                              );
                            }
                          
                       });
                         }
                         else{
                          await repo.sendResendEmail(task.email , task.to , 'Sheet Updates' ,  task.message);
                          await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                         }
                      }else{
                        await controller.calendar_events(userId , task.title ,  task.message , task.start_date );
                        await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                      }
                     }else{
                        await controller.calendar_events(userId , task.title ,  task.message , task.start_date );
                        await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                     }
                     if(task.slack_reminder){
                      if(task.start_date){
                        const date = new Date(task.start_date);
                        const now = new Date();
                         if(date > now){
                          const minutes = date.getMinutes();
                          const hours = date.getHours();
                          const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                          console.log(cronExpression);
                          node_cron.schedule(cronExpression, async() => {
                            try{
                              await repo.sendSlackNotfication(task.url , task.message);
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Completed" } }
                              );
                            }
                            catch(e){
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Failed" } }
                              );
                            }
                            
                       });
                         }
                         else{
                          await repo.sendSlackNotfication(task.url , task.message);
                          await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                         }
                      }else{
                        await controller.calendar_events(userId , task.title ,  task.message , task.start_date );
                        await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                      }
                     }else{
                      await controller.calendar_events(userId , task.title ,  task.message , task.start_date );
                      await Workflow.updateOne(
                        { "tasks._id": task._id },
                        { $set: { "tasks.$.taskStatus": "Completed" } }
                      );
                    }              
                  }
                  else if (task.type  === 'Google_Sheets'){
                            
                    if(task.google_reminder){
                        if(task.start_date){
                          const date = new Date(task.start_date);
                          const now = new Date();
                           if(date > now){
                            const minutes = date.getMinutes();
                            const hours = date.getHours();
                            const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                            node_cron.schedule(cronExpression, async() => {
                              try{
                                await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                                await Workflow.updateOne(
                                  { "tasks._id": task._id },
                                  { $set: { "tasks.$.taskStatus": "Completed" } }
                                );
                              }
                              catch(e){
                                await Workflow.updateOne(
                                  { "tasks._id": task._id },
                                  { $set: { "tasks.$.taskStatus": "Failed" } }
                                );
                              }
                           
                         });
                           }
                           else{
                            await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                           }
                        }else{
                          await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                        }
                    }else{
                      await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                      await Workflow.updateOne(
                        { "tasks._id": task._id },
                        { $set: { "tasks.$.taskStatus": "Completed" } }
                      );
                    }

                    if(task.slack_reminder){
                      if(task.start_date){
                        const date = new Date(task.start_date);
                        const now = new Date();
                         if(date > now){
                          const minutes = date.getMinutes();
                          const hours = date.getHours();
                          const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                          console.log(cronExpression);
                          node_cron.schedule(cronExpression, async() => {
                            try{
                              await repo.sendSlackNotfication(task.url , task.message);
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Completed" } }
                              );
                            }
                            catch(e){
                              await Workflow.updateOne(
                                { "tasks._id": task._id },
                                { $set: { "tasks.$.taskStatus": "Failed" } }
                              );
                            }
                            
                         });
                         }
                         else{
                           await repo.sendSlackNotfication(task.url , task.message);
                           await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                         }
                      } else{
                        await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                        await repo.sendSlackNotfication(task.url , task.message);
                          await Workflow.updateOne(
                            { "tasks._id": task._id },
                            { $set: { "tasks.$.taskStatus": "Completed" } }
                          );
                      }
                    }else{
                      await repo.google_sheets_func(userId , task.subject , task.message , task.status , task.spread_sheet_url);
                      await Workflow.updateOne(
                        { "tasks._id": task._id },
                        { $set: { "tasks.$.taskStatus": "Completed" } }
                      );
                    }
                  }
                  else if(task.type === 'Linked_in'){
                
                    if(task.start_date){
                      const date = new Date(task.start_date);
                      const now = new Date();
                       if(date > now){
                        const minutes = date.getMinutes();
                        const hours = date.getHours();
                        const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                        node_cron.schedule(cronExpression, async() => {
                          try{
                            await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }
                          catch(e){
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Failed" } }
                            );
                          }
                          
                       });
                       }
                       else{
                        await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                       }
                    }else{
                      await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                    }
                  }
                  else if(task.type === 'Youtube'){
                    if(task.start_date){
                      const date = new Date(task.start_date);
                      const now = new Date();
                       if(date > now){
                        const minutes = date.getMinutes();
                        const hours = date.getHours();
                        const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                        node_cron.schedule(cronExpression, async() => {
                          try{
                            await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }
                          catch(e){
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Failed" } }
                            );
                          }
                          
                       });
                       }
                       else{
                        await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                       }
                    }else{
                      await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                    }
                  }
                  else if(task.type === 'Facebook'){
                    if(task.start_date){
                      const date = new Date(task.start_date);
                      const now = new Date();
                       if(date > now){
                        const minutes = date.getMinutes();
                        const hours = date.getHours();
                        const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                        node_cron.schedule(cronExpression, async() => {
                          try{
                            await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }
                          catch(e){
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Failed" } }
                            );
                          }
                          
                       });
                       }
                       else{
                        await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                       }
                    }else{
                      await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                    }
                  }
                  else if(task.type === 'Instagram'){
                    if(task.start_date){
                      const date = new Date(task.start_date);
                      const now = new Date();
                       if(date > now){
                        const minutes = date.getMinutes();
                        const hours = date.getHours();
                        const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                        node_cron.schedule(cronExpression, async() => {
                          try{
                            await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }
                          catch(e){
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Failed" } }
                            );
                          }
                          
                       });
                       }
                       else{
                        await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                       }
                    }else{
                      await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                    }
                  }
                  else if(task.type === 'Video'){
                    if(task.start_date){
                      const date = new Date(task.start_date);
                      const now = new Date();
                       if(date > now){
                        const minutes = date.getMinutes();
                        const hours = date.getHours();
                        const cronExpression = `${minutes} ${hours} ${date.getDate()} ${date.getMonth() + 1} *`;
                        node_cron.schedule(cronExpression, async() => {
                          try{
                            await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                          }
                          catch(e){
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Failed" } }
                            );
                          }
                          
                       });
                       }
                       else{
                        await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                       }
                    }else{
                      await  repo.post_social_media(task.message  , task.file , task.selected_platform);
                            await Workflow.updateOne(
                              { "tasks._id": task._id },
                              { $set: { "tasks.$.taskStatus": "Completed" } }
                            );
                    }
                  }
                  else if(task.type === 'Invoice'){
                      if(task.google_drive){
                         await repo.post_google_drive(userId , task.file);
                         await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                      }else{
                        await Workflow.updateOne(
                          { "tasks._id": task._id },
                          { $set: { "tasks.$.taskStatus": "Completed" } }
                        );
                      }
                  }
                }
                catch(task_error){
                   console.log(`Task error: ${task.type} `);
                   await Workflow.updateOne(
                    { "tasks._id": task._id },
                    {
                      $set: {
                        "tasks.$.taskStatus": 'Failed',
                      },
                    }
                  );
                }
                  // Add any additional task types here
              }
          }
            return get_workflow;
        } catch (error) {
            console.error(` Main Error Save Work flows:` , error);
              throw error
        }
     }
}