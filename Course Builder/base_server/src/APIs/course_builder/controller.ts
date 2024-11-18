import { Request, Response } from 'express'
import post from './_shared/repo/upload'

export default {
    upload:  async(request: Request, response: Response) => {
        try {
            const Course = await post.post_data(request.body);
            response.status(201).send({data : Course})
            
        } catch (error) {
            console.log(error)
          
        }
    },
    
   
}
