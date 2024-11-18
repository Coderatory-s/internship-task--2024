import axios from 'axios';
module.exports = {
     
    send_id_token : async(id_token : any) => {
          try {
            let a = await axios.post(`http://localhost:3000/v1/create_token` , {
                id_token : id_token} , {
                  headers: {
                    accessToken : localStorage.getItem("token"), // Send token in headers
                  },
                }
              );
            return a.data;
          } catch (error) {
            throw error;
          }
    },
   get_sheets_data : async() => {
      try {
        let a = await axios.get(`http://localhost:3000/v1/google_sheets_data` , {
            headers: {
              accessToken : localStorage.getItem("token"), // Send token in headers
            },
          }
        );
        console.log(a.data);
        return a.data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    fetch_short_video : async(formdata : any) => {
       try{
          let a = await axios.post(`https://api.cloudinary.com/v1_1/de2nzvcrd/video/upload` , formdata);
          console.log(a);
          if(a.status === 200){
              return a.data;
          }
       }
       catch(e){
        console.log(e)
         throw e
       }
    },
    post_pdf : async(form : any , docu : any) => {
       try{
          let a = await axios.post(`http://localhost:3000/v1/generate_pdf` , {
             formData : form,
             doctype : docu
          } , {
            responseType: 'blob', // Make sure we receive the response as a blob
          });
          console.log(a);
          if(a.status === 200){
              return a.data;
          }
       }
       catch(e){
        console.log(e)
         throw e
       }
    }
   }

