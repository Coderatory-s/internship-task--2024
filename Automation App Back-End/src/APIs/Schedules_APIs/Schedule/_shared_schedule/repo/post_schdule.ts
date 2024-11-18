
import {Resend} from 'resend'
const { IncomingWebhook } = require('@slack/webhook');
const { google } = require('googleapis');
import token_DB from '../models/Refresh_tokens';
const SocialPost = require("social-media-api");
import Workflow from '../models/Schedule';
const API_KEY = "64FF3C8F-3C45491B-81775747-6BCB0EA3"; // get an API Key at ayrshare.com
const social = new SocialPost(API_KEY);
const cloudinary = require('cloudinary'); 
// import { Buffer } from 'buffer';

cloudinary.v2.config({
  cloud_name: 'de2nzvcrd',
  api_key: '825669894714912',
  api_secret: 'oF8KTSpoHsYcBYiA7mo-pJDAgtA',
});

const oauth2Client = new google.auth.OAuth2(
  "1057249070232-hkc7e3b8398ftii8n8uocu71ktiv66oi.apps.googleusercontent.com",
  "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",
  'http://localhost:3001'
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive'
];

// Authorization URL generate karna
oauth2Client.generateAuthUrl({
  access_type: 'offline', // offline access ke liye
  scope: SCOPES
});

function extractSpreadsheetId(url : any) {
  const regex = '/spreadsheets\/d\/([a-zA-Z0-9_-]+)/';
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default {
     sendResendEmail :  async (fromEmail? : any ,  toEmail? : any, subject? : any, message? : any) : Promise<any> =>  {
        try {
            console.log(fromEmail);
            if(!toEmail){
              throw new Error('Reciever Email is not provided');
            }
            const resend = new Resend('re_ZJNxUzbm_LPt7ZUF1HNdj27uSqv6CQ3sF');
             let emialresponse =  await resend.emails.send({
              from: `${fromEmail} <onboarding@resend.dev>`,
              to:  toEmail,
              subject:  subject,
              html: `<p>${message}</p>`,
            });
             return emialresponse;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },
       sendSlackNotfication : async(url? : any , message? : any) : Promise<any> => {
        try {
          if(!url){
             throw new Error('Slack url not provided')
          }
            const url_webhook = `${url}`;
             // Initialize the webhook
             const webhook = new IncomingWebhook(url_webhook);
            let r =  await webhook.send({
              text: message, // The message you want to send
            });
             return r
          } catch (error) {
            console.error('Error sending notification to Slack:', error);
            throw error;
          }
       },
       exchage_token : async(id_token : any , _id : any) : Promise<any> => {
             try {
              const { tokens } = await oauth2Client.getToken(id_token);
              oauth2Client.setCredentials(tokens); // Set credentials for future API calls  
              const save_token = await token_DB.findOneAndUpdate(
                { auth_id: _id }, // Find document based on auth_id
                { refresh_token: tokens.refresh_token }, // Update refresh token
                { new: true, upsert: true }
              );
                return  save_token; // tokens.access_token, tokens.refresh_token
             } catch (error) {
                console.log(error)
                throw error;
             }
       },
       find_auth_token : async( _id : any , title : any,  message : any, start_date : any) => {
        try {
          console.log(_id, title,  message , start_date);
          const save_token = await token_DB.findOne({auth_id : _id});
          
          if (save_token) {
            console.log(save_token.refresh_token);
            oauth2Client.setCredentials({refresh_token: save_token.refresh_token}); // Set credentials for future API calls
          }
          const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
          const event = {
            summary: title,
            location: 'Karachi',
            description: message,
            start: {
              dateTime: new Date(start_date).toISOString(),
            },
            end: {
              dateTime: new Date(new Date(start_date).getTime() + 1 * 60 * 1000).toISOString(), // 2 minutes baad ka end time
            },  
            };
          calendar.events.insert(
            {
              calendarId: 'primary',
              resource: event,
            });
          return  calendar; // tokens.access_token, tokens.refresh_token
         } catch (error) {
            console.log(error)
            throw error;
         }
       },
       google_sheets_func : async( _id : any , subject : any  , message : any , status : any , spread_sheet_url : any) => {
         try {   
            const filter_url =  extractSpreadsheetId(`https://docs.google.com/spreadsheets/d/${spread_sheet_url}/edit?gid=0#gid=0`);
            console.log(subject , message , status);
            console.log(spread_sheet_url)
             const save_token = await token_DB.findOne({auth_id : _id});
             if (save_token) {
               oauth2Client.setCredentials({refresh_token: save_token.refresh_token}); // Set credentials for future API calls
             }
            
             const sheets = google.sheets({ version: 'v4' });
             const data = [
              [subject, message, status] // Wrap the subject, message, and status in an array
            ];

             await sheets.spreadsheets.values.append({
              auth: oauth2Client,
              spreadsheetId: filter_url,
              range: 'Sheet1!A:B', // Adjust the range as necessary
              valueInputOption: 'RAW',
              resource: {
                values: data,
              },
            });


             
         } catch (error) {
          console.log(error)
           throw error;
         }
       },
       post_social_media : async(message : any , file : any , selected_platform : any ) => {
         try {

          const postData: any = {
            post: message,
            shorten_links: true,
            platforms: selected_platform,
          };
      
          // Only include mediaUrls if a file is provided
          if (file) {
            postData.mediaUrls = [file];
          }
          console.log(selected_platform);
          const post = await social.post({
            post: message,                      // The text of the post
            mediaUrls: [file],           // Array of media URLs in base64 format
            shorten_links: true,
            platforms: ['facebook'],
          });
          console.log("Post successful:", post);
          return post;
         } catch (error) {
            console.log(error);
            throw error;
         }
       },
       lists_google_sheets : async(_id : string) => {
          try {
            const save_token = await token_DB.findOne({auth_id : _id});
             if (save_token) {
               console.log(save_token.refresh_token);
               oauth2Client.setCredentials({refresh_token: save_token.refresh_token}); // Set credentials for future API calls
             }
            const drive = google.drive({ version: 'v3', auth: oauth2Client });
            const response = await drive.files.list({
              q: "mimeType='application/vnd.google-apps.spreadsheet'",
              fields: 'files(id, name)', // Return only id and name of files
            });
        
            const sheets = response.data.files;
            console.log('Google Sheets:', sheets);
            return sheets;
          } catch (error) {
            console.error('Error fetching Google Sheets:', error);
          }
       },
       get_one_workflow : async(id : string) => {
          try{
              let a = await Workflow.find({_id : id});
              if(!a){
                 throw new Error ('Record not found')
              }
              return a;
          }
          catch(error){
            console.log(error)
             throw error;
          }
       },
       post_google_drive : async( _id : any , data : any) => {
        try{
          const save_token = await token_DB.findOne({auth_id : _id});
          if (save_token) {
            console.log(save_token.refresh_token);
            oauth2Client.setCredentials({refresh_token: save_token.refresh_token}); // Set credentials for future API calls
          }
          const drive = google.drive({ version: 'v3', auth: oauth2Client });
          const fileMetadata = {
            name: 'generated-document.pdf', // Change the file name as needed
         // Specify a folder ID in Google Drive or leave it empty for root folder
          };
          console.log(data);
          // const bufferData = Buffer.from(data, 'base64');
          
          const media = {
            mimeType: 'application/pdf',
            body: data,  
          };
      
          const file = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
          });
          console.log('File uploaded successfully. File ID:', file.data.id);
           return file.data.id;
        }
        catch(e){
           console.log(e);
        }
        
       }
}