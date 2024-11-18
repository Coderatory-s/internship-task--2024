'use client'
import React from 'react';
import All_Work_Flow from '@/Components/all_work_flow/All_Work_Flow';
import Navbar from "@/Components/Navbar/Navbar";
const page = () => {
  return (
    <>
    <div className=' bg-purple-50 min-h-screen'>
      <Navbar />
      <All_Work_Flow />
      </div>
    </>
  )
}

export default page;