
'use client'

import React from 'react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter();
     
  const {register , handleSubmit , formState : {errors} , reset } = useForm();
   
 async function onSubmit(data:  any) {
  try {
    let a = await axios.post(`http://localhost:3000/v1/register` , data);
    if(a.status === 201){
      reset();
      toast({
        title : `Account is Created`,
        description : `${new Date().toLocaleString()}`
      })
      router.push('/login')
    }
  } catch (error) {
    toast({
      title : `Invalid Credentials`,
      description : `${new Date().toLocaleString()}`
    })
     console.log(error);
  }
  }

  return (
    <>
       <div className="flex  justify-center h-screen  items-center">
         <div className="form_data">
         <h1 className=' text-2xl text-center mt-3 '>Sign in </h1>
              <form  onSubmit={handleSubmit(onSubmit)}>
         <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor="mail">User name</Label>
      <Input type="text" id="mail"   {...register('name' , {
         required:  'Fill the field'
      })} placeholder="Name" />
       <div>{errors?.name?.type === 'required' && ( <>{errors?.name?.message}</> )}</div>
    </div>  
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor="ail">Email</Label>
      <Input type="email" id="ail" {...register('email' , {
         required:  'Fill the field'
      })} placeholder="Email" />
      <div>{errors?.email?.type === 'required' && ( <>{errors?.email?.message}</> )}</div>
    </div> 

    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor="l">Password</Label>
      <Input type="password" id="l" {...register('password' , {
         required:  'Fill the field'
      })} placeholder="Password" />
      <div>{errors?.password?.type === 'required' && ( <>{errors?.password?.message}</> )}</div>
    </div> 

    <div className=" grid w-full max-w-sm items-center gap-1.5" style={{ display : "none"}}>
      <Label htmlFor="email">Phone number</Label>
      <Input type="number" value={3188063123} {...register('phoneNumber')} id="email" placeholder="Email" />
    </div>

    <div className=" grid w-full max-w-sm items-center gap-1.5 " style={{ display : "none"}}>
      <Label htmlFor="email">Consent</Label>
      <Input type="text" value={'true'} {...register('consent')} id="email" placeholder="Email" />
    </div>
     
    <Button className='my-3' type="submit">Submit</Button>
    </form>
         </div>
      
       </div>
    </>
  )
}

export default page