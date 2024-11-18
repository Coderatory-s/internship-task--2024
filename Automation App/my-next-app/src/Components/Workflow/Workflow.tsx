"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Loader2 } from "lucide-react"
import {Button} from '@/Components/ui/button'
import axios from 'axios'
import useSWR from 'swr'
import Skeleton_Loader from '../Skeleton_Loader/Skeleton_Loader'
import { useRouter } from 'next/navigation'
import {useUserStore} from '../store/Zustand_Store';

const Workflow = () => {

  const set_work_flow_data = useUserStore((state) => state.set_work_flow_data);
  const work_flow_data = useUserStore((state) => state.work_flow_data);
  const set_card_id = useUserStore((state) => state.set_card_id);

  const router = useRouter();
  
   const fetch_work_flow = async(url : string) => {
        try {
            const response = await axios.get( url , {
               headers : {
                accessToken : localStorage.getItem('token')
               }
            })
            set_work_flow_data(response.data.data)
        } catch (error) {
             router.push('/login')
        }
   }
    
   const {error, isLoading } = useSWR('http://localhost:3000/v1/get_workflow', fetch_work_flow);

    if(isLoading){
       return <Skeleton_Loader />
    }
    
    if(error){
       return <div>Error fetching data: {error.message}</div>
    }

  return (
     <>
       <div className="container mx-auto">
          <div className="cards_container flex flex-wrap lg:gap-5  my-6 justify-around ">
         {work_flow_data.map((e  : any) => {
            return (
               <>
          <Card  key={e._id} className={"w-[280px]"}>
          <CardHeader>
        <CardTitle >Work Flow</CardTitle>
      </CardHeader>
               {e.tasks.map((task : any) => {
                 return (
                   <> 
      <CardContent className="grid gap-4">
        <div>
            <div
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium leading-none">
                {task.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  {task.taskStatus === 'Processing' ? <Loader2 className="animate-spin w-[15px]"/> : <div className='w-[15px] mx-2' >✔</div>}
                </p>
              </div>
            </div>
        </div>
      </CardContent>


                   </>
                 )
               })}
                     <CardFooter className='relative '>
        <Button className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => {
          set_card_id(e._id)
          router.push('/all_work_flow')
        }}>
          Read More...
        </Button>
      </CardFooter>
               </Card>   
               </>
            )
         }).reverse()}
         
          </div>
       </div>
     </>
  )
}

export default Workflow;