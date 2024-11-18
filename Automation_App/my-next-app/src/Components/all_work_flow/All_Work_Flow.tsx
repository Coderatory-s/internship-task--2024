"use client"


import React from 'react'
import { useUserStore } from '../store/Zustand_Store';
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import axios from 'axios';
import useSWR from 'swr'

const All_Work_Flow = () => {
  const set_one_workflow_data = useUserStore((state) => state.set_one_workflow_data);
  const one_workflow_data = useUserStore((state) => state.one_workflow_data);
  const card_id = useUserStore((state) => state.card_id);



  const get_one_data = async (url: string) => {
    try {
      let a = await axios.get(url);
      if (a.status === 200) {
        set_one_workflow_data(a.data.data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const { isLoading } = useSWR(`http://localhost:3000/v1/get_workflow/${card_id}`, get_one_data);

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <div className="container mx-auto ">
        <div className="cards_container flex flex-wrap lg:gap-2  my-6 justify-around ">
          {one_workflow_data.map((e: any) => {
            return (
              <>
                <Card key={e._id} >
                  <CardHeader>
                    <CardTitle>Work Flow</CardTitle>
                  </CardHeader>
                  {e.tasks.map((task: any) => {
                    return (
                      <>
                        <CardContent className="grid gap-4">
                          <div>
                            <div
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                              <div className="space-y-1">
                                {task.type && (
                                  <>
                                    <p className="text-sm font-medium leading-none">
                                      {task.type}
                                    </p>
                                  </>
                                )}

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.email && (
                                    <>
                                      <p className="text-sm  mx-3 font-medium leading-none">
                                        From :
                                      </p>
                                      <p>
                                        {task.email}
                                      </p>
                                    </>
                                  )}
                                </p>
                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.subject && (
                                    <>
                                      <p className="text-sm   mx-3 font-medium leading-none">
                                        Subject :
                                      </p>
                                      <p>
                                        {task.subject}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.title && (
                                    <>
                                      <p className="text-sm   mx-3 font-medium leading-none">
                                        Subject :
                                      </p>
                                      <p>
                                        {task.title}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.message && (
                                    <>
                                      <p className="text-sm  mx-3 font-medium leading-none">
                                        Message :
                                      </p>
                                      <p>
                                        {task.message}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.file && (
                                    <>
                                      <p className="text-sm  mx-3 font-medium leading-none">
                                        Media :
                                      </p>
                                      <p>
                                        {task.file}
                                       {/* <img src={task.file} width={'300px'} height={'300px'}/>
                                       <video controls width={'300px'} height={'400px'} >
                                          <source src={task.file} type="video/mp4"/>
                                          Your browser does not support the video tag.
                                       </video> */}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex flex-wrap    pl-5">
                                  {task?.selected_platform?.length > 0 && task.selected_platform && (
                                    <>
                                      <p className="text-sm   mx-3 font-medium leading-none">
                                        Post :
                                      </p>
                                      <ul>
                                        {task?.selected_platform?.map((e: any) => {
                                          return (
                                            <>

                                              <li>{e} , </li>

                                            </>
                                          )
                                        })}
                                      </ul>
                                    </>
                                  )}

                                </p>

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.
                                    spread_sheet_url && (
                                      <>
                                        <p className="text-sm   mx-3 font-medium leading-none">
                                          Google Sheets :
                                        </p>
                                        <p>
                                          {task.
                                            spread_sheet_url}
                                        </p>
                                      </>
                                    )}
                                </p>

                                <p className="text-sm flex flex-wrap    pl-5 ">
                                  {task?.to?.length > 0 && task.to && (
                                    <>
                                      <p className="text-sm  mx-3 font-medium leading-none">
                                        to :
                                      </p>
                                      <ul>
                                        {task?.to?.map((e: any) => {
                                          return (
                                            <>

                                              <li>{e}</li>

                                            </>
                                          )
                                        })}
                                      </ul>
                                    </>
                                  )}

                                </p>

                                <p className="text-sm flex items-center   pl-5 ">
                                  {task.start_date && (
                                    <>
                                      <p className="text-sm   mx-3 font-medium leading-none">
                                        Reminder Date :
                                      </p>
                                      <p>
                                        {new Date(task.start_date).toLocaleDateString()}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex flex-wrap items-center   pl-5 ">
                                  {task.url && (
                                    <>
                                      <p className="text-sm   mx-3 font-medium leading-none">
                                        Workspace :
                                      </p>
                                      <p>
                                        {task.url}
                                      </p>
                                    </>
                                  )}
                                </p>

                                <p className="text-sm flex flex-wrap items-center   pl-5 ">
                                      <>
                                        <p className="text-sm  mx-3 font-medium leading-none">
                                          Status :
                                        </p>
                                        <p>
                                          {task.
                                            taskStatus === 'Processing' ? <Loader2 className="animate-spin w-[15px]" /> :  <div className='w-[15px] mx-2' >✔</div>}
                                        </p>
                                      </>
                                  
                                </p>


                              </div>
                            </div>
                          </div>
                        </CardContent>


                      </>
                    )
                  })}
                </Card>
              </>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default All_Work_Flow;