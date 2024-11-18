/* eslint-disable @next/next/no-img-element */

import React from "react";
import '../../app/globals.css'

const Banner = () => {

return(
    <div className="flex mt-3 m-auto">
    <div className="h-96 w-1/2">
        <h3 className="text-center font-bold pt-12 ">
            <span  className="text-4xl">
        "Your People, Your Success"
        </span><br></br>
       <span className="italic  text-3xl pt-5"> 
         Discover the tools to effectively manage your workforce and unlock potential.
          From recruitment to performance, HRM is here to support every
           step of your HR journey
           </span>
        </h3>
    </div>
    <div className="h-96 w-1/2">
            <img src="https://img.freepik.com/free-photo/business-success-report-graph-concept_53876-121032.jpg?ga=GA1.1.2141339339.1729485896&semt=ais_hybrid"/>
    </div>
    </div>
)

}
export default Banner