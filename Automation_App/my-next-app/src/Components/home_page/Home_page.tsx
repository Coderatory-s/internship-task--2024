'use client'

import React  from 'react'
import Drag from '../Drag/Drag'
import Drop from '../Drop/Drop'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarProvider,
} from "@/Components/ui/sidebar"
import Slack_logo from '../../../assests/Slack-logo.png';
import Gmail_logo from '../../../assests/gmail_logo.jpg'; 
import Google_Sheet_logo from '../../../assests/Google_Sheet_logo.png';
import Google_Calendar_logo from '../../../assests/Calendar.png';
import Linked_In_logo from '../../../assests/linkedin_logo.png';
import Youtubr_logo from '../../../assests/youtube_logo.jpeg';
import Instagram_logo from '../../../assests/instagram-logo.png';
import Facebook_logo from  '../../../assests/facebook_logo.jpeg';
import Video_logo from '../../../assests/video.png';
import Invoice_logo from '../../../assests/Invoice_Logo.jpeg';
import { useRouter } from 'next/navigation';

const style = {
  gradientText: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '25px',
    background: 'linear-gradient(to right, #C6A0FF, #9A7FFF, #E5B3FF)',
    backgroundClip: 'text',
    color: 'transparent',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  }
}

const Home_page : React.FC = () => {

   const data = [
    {
      id: 1,
      type : "Gmail",
      name: 'Send Email',
      logo: Gmail_logo.src,
    },
    {
      id: 1,
      type : "Slack_Notification",
      name: 'Slack Notification',
      logo: Slack_logo.src,
    },
    {
      id: 1,
      type : "Google_Calendar",
      name: 'Google Calendar',
      logo: Google_Calendar_logo.src,
    },
    {
      id: 1,
      type : "Google_Sheets",
      name: 'Google Sheets',
      logo: Google_Sheet_logo.src,
    },
    {
      id : 1,
      type : "Facebook",
      name : 'Facebook' ,
      logo : Facebook_logo.src,
    },
    {
      id : 1 ,
      type : 'Invoice',
      name : 'Contract & Invoice',
      logo : Invoice_logo.src,
    },
    {
      id : 1,
      type : "Instagram",
      name : 'Instagram' ,
      logo : Instagram_logo.src,
    },
    {
      id : 1,
      type : "Video",
      name : 'Video' ,
      logo : Video_logo.src,
    },
    {
       id : 1,
       type : "Linked_in",
       name : 'LinkedIn' ,
       logo : Linked_In_logo.src,
    },
    {
      id : 1,
      type : "Youtube",
      name : 'Youtube' ,
      logo : Youtubr_logo.src,
    },
   ]

  const router = useRouter();
    
  return (
     <>
      <DndProvider backend={HTML5Backend} >
          <div
           style={{ display: 'flex', gap: '20px', padding: '50px' }} 
           className='bg-purple-50'
           >
      {/* Action Panel */}  
      <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
<SidebarProvider>
<Sidebar>
      <SidebarContent>
        <SidebarHeader className='mt-3 bg-purple-50'>
            {/* <p className='text-center font-extrabold text-2xl'>Automation</p> */}
            <div className="flex mx-2 items-center ">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
              <p className='ml-2' style={style.gradientText}>Automations</p>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((e : any) => {
                return (
                  <SidebarMenuItem key={e.id}>
                    <Drag id={e.id} name={e.name} type={e.type} logo={e.logo} />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
</Sidebar>
</SidebarProvider>



        {/* Add more action blocks as needed */}

      </div>

      {/* Drop Canvas for workflow creation */}
        <Drop/>
    </div>
    </DndProvider>

     
     </>
  )
}

export default Home_page