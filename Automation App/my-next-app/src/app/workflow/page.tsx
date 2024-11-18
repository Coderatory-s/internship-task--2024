'use client'
import Workflow from '@/Components/Workflow/Workflow';
import React from 'react';
import Navbar from "@/Components/Navbar/Navbar";
const page = () => {
  return (
    <>
    <div className='bg-purple-50 min-h-screen'>
         <Navbar />
        <Workflow />
        </div>
    </>
  )
}

export default page