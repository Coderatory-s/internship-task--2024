
'use client'

import React , {useState} from 'react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"

const page = () => {
     
   const router = useRouter();
  const {register , handleSubmit , formState : {errors} , reset} = useForm();
  const [loading  , setloading] = useState(false);
   
 async function onSubmit(data:  any) {
    try {
       setloading(true);
      let a = await axios.post(`http://localhost:3000/v1/login` , data);
      if(a.status === 200){
        localStorage.setItem('token' , a.data.data.accessToken);
        setloading(false);
        reset();
        toast({
          title : `Log in Succesfully`,
          description : `${new Date().toLocaleString()}`,
        })
        router.push('/')
      }
    } catch (error) {
       console.log(error);
       setloading(false);
       toast({
        title : `Invalid Credentials`,
        description : `${new Date().toLocaleString()}`,
      })
    }
  }
  return (
    <>
       <div className="flex  justify-center h-screen  items-center border">
         <div className="form_data rounded-xl p-5 pt-0 shadow-2xl ">
         <h1 className=' mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Log In</h1>
              <form  onSubmit={handleSubmit(onSubmit)}>
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor="ail">Email</Label>
      <Input type="email" id="ail" {...register('email' , {
         required:  'Fill the field'
      })} placeholder="Email" />
      <div>{errors?.email?.type === 'required' && ( <>{errors?.email?.message}</> )}</div>
    </div> 

    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor="l">Password</Label>
      <Input type="password"
       id="l" {...register('password' , {
         required:  'Fill the field'
      })} placeholder="Password" />
      <div>{errors?.password?.type === 'required' && ( <>{errors?.password?.message}</> )}</div>
    </div> 
     
     {loading ?
       <Button disabled className='my-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
       <Loader2 className="animate-spin " />
       Please wait
     </Button>
      : 
      <Button className='my-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type="submit">Log in </Button>
     }

    </form>
         </div>
      
       </div>
    </>
  )
}

export default page