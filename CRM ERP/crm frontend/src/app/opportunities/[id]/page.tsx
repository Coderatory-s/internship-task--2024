// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getOpportunities } from "@/services/opportunityService"; // Adjust the import path if needed
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Opportunities() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const router = useRouter();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["opportunities"],
//     queryFn: getOpportunities,
//   });

//   const filteredOpportunities = data?.filter((opportunity: any) =>
//     ["_id", "leadId", "status"].some((key) =>
//       opportunity[key]?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (isLoading) return <div className="text-center my-4 text-2xl">Loading...</div>;
//   if (error) return <div>Error fetching opportunities</div>;

//   return (
//     <div className="my-10 max-w-[1200px] mx-auto">
//       <div className="flex flex-col items-center sm:flex-row justify-between ">
//         <h2 className="my-4 text-2xl font-bold">Opportunity List</h2>
//         <input
//           className="max-w-[400px] my-3 p-2 border"
//           placeholder="Search by ID, Lead ID, Status"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <hr className="my-4" />

//       <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//         {filteredOpportunities && filteredOpportunities.length > 0 ? (
//           filteredOpportunities.map((opportunity: any) => (
//             <div key={opportunity._id} className="p-3 break-words rounded-lg border-2 min-w-[120px]">
//               <p><strong>ID: </strong> <i>{opportunity._id}</i></p>
//               <p><strong>Lead ID: </strong> <i>{opportunity.leadId}</i></p>
//               <p><strong>Status: </strong> <i>{opportunity.status}</i></p>
//               <div className="flex flex-col sm:flex-row  justify-start flex-wrap gap-3">
//                 <Button onClick={() => router.push(`/opportunities/${opportunity._id}`)}>View Details</Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-red-400">No opportunities available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getOpportunities, createOpportunity } from "@/services/opportunityService"; // Adjust the import paths if needed
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Opportunities() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [leadId, setLeadId] = useState("");
//   const [status, setStatus] = useState("");

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   // Fetch opportunities
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["opportunities"],
//     queryFn: getOpportunities,
//   });

//   // Create opportunity mutation
//   const mutation = useMutation(createOpportunity, {
//     onSuccess: () => {
//       // Invalidate and refetch the list after a new opportunity is added
//       queryClient.invalidateQueries(["opportunities"]);
//     },
//   });

//   // Handle form submission to add a new opportunity
//   const handleCreateOpportunity = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (leadId && status) {
//       mutation.mutate({
//         leadId,
//         status,
//       });
//       setLeadId(""); // Clear input fields
//       setStatus("");
//     }
//   };

//   // Filter opportunities based on the search term
//   const filteredOpportunities = data?.filter((opportunity: any) =>
//     ["_id", "leadId", "status"].some((key) =>
//       opportunity[key]?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (isLoading) return <div className="text-center my-4 text-2xl">Loading...</div>;
//   if (error) return <div>Error fetching opportunities</div>;

//   return (
//     <div className="my-10 max-w-[1200px] mx-auto">
//       <div className="flex flex-col items-center sm:flex-row justify-between ">
//         <h2 className="my-4 text-2xl font-bold">Opportunity List</h2>
//         <input
//           className="max-w-[400px] my-3 p-2 border"
//           placeholder="Search by ID, Lead ID, Status"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Form to create a new opportunity */}
//       <form onSubmit={handleCreateOpportunity} className="my-6">
//         <h3 className="text-xl font-semibold">Create New Opportunity</h3>
//         <div className="flex flex-col gap-4 my-4">
//           <input
//             type="text"
//             className="p-2 border"
//             placeholder="Enter Lead ID"
//             value={leadId}
//             onChange={(e) => setLeadId(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             className="p-2 border"
//             placeholder="Enter Status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//           />
//           <Button type="submit" disabled={mutation.isLoading}>
//             {mutation.isLoading ? "Creating..." : "Create Opportunity"}
//           </Button>
//         </div>
//       </form>

//       <hr className="my-4" />

//       {/* Display the list of opportunities */}
//       <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//         {filteredOpportunities && filteredOpportunities.length > 0 ? (
//           filteredOpportunities.map((opportunity: any) => (
//             <div key={opportunity._id} className="p-3 break-words rounded-lg border-2 min-w-[120px]">
//               <p><strong>ID: </strong> <i>{opportunity._id}</i></p>
//               <p><strong>Lead ID: </strong> <i>{opportunity.leadId}</i></p>
//               <p><strong>Status: </strong> <i>{opportunity.status}</i></p>
//               <div className="flex flex-col sm:flex-row  justify-start flex-wrap gap-3">
//                 <Button onClick={() => router.push(`/opportunities/${opportunity._id}`)}>View Details</Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-red-400">No opportunities available</p>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getOpportunities, createOpportunity } from "@/services/opportunityService"; // Adjust the import paths if needed
// import { Button } from "@/components/ui/button"; // Assuming you're using Shadcn Button and Input components
// import {Input} from "@/components/ui/input"
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Opportunities() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [leadId, setLeadId] = useState<string>("");
//   const [status, setStatus] = useState<string>("");
  
    

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   // Fetch opportunities
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["opportunities"],
//     queryFn: getOpportunities,
//   });

//   // Create opportunity mutation
// const mutation = useMutation<
//   any, 
//   Error, 
//   { leadId: string; status: string }
// >(
//   (newOpportunity) => createOpportunity(newOpportunity),
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["opportunities"]);
//     },
//   }
// );

  

//   // Handle form submission to add a new opportunity
//   const handleCreateOpportunity = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (leadId && status) {
//       // Explicit type assertion
//       mutation.mutate({ leadId: leadId as string, status: status as string });
      
//       setLeadId("");  // Clear input fields
//       setStatus("");
//     }
//   };
//   // Filter opportunities based on the search term
//   const filteredOpportunities = data?.filter((opportunity: any) =>
//     ["_id", "leadId", "status"].some((key) =>
//       opportunity[key]?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (isLoading) return <div className="text-center my-4 text-2xl">Loading...</div>;
//   if (error) return <div>Error fetching opportunities</div>;

//   return (
//     <div className="my-10 max-w-[1200px] mx-auto">
//       <div className="flex flex-col items-center sm:flex-row justify-between">
//         <h2 className="my-4 text-2xl font-bold">Opportunity List</h2>
//         {/* Shadcn Input component for search */}
//         <Input
//           className="max-w-[400px] my-3"
//           placeholder="Search by ID, Lead ID, Status"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Form to create a new opportunity */}
//       <form onSubmit={handleCreateOpportunity} className="my-6">
//         <h3 className="text-xl font-semibold">Create New Opportunity</h3>
//         <div className="flex flex-col gap-4 my-4">
//           {/* Shadcn Input components for form */}
//           <Input
//             type="text"
//             className="p-2"
//             placeholder="Enter Lead ID"
//             value={leadId}
//             onChange={(e) => setLeadId(e.target.value)}
//             required
//           />
//           <Input
//             type="text"
//             className="p-2"
//             placeholder="Enter Status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//           />
//           {/* Shadcn Button component for form submission */}
//           <Button type="submit" disabled={mutation.isLoading}>
//             {mutation.isLoading ? "Creating..." : "Create Opportunity"}
//           </Button>
//         </div>
//       </form>

//       <hr className="my-4" />

//       {/* Display the list of opportunities */}
//       <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//         {filteredOpportunities && filteredOpportunities.length > 0 ? (
//           filteredOpportunities.map((opportunity: any) => (
//             <div
//               key={opportunity._id}
//               className="p-3 break-words rounded-lg border-2 min-w-[120px]"
//             >
//               <p>
//                 <strong>ID: </strong> <i>{opportunity._id}</i>
//               </p>
//               <p>
//                 <strong>Lead ID: </strong> <i>{opportunity.leadId}</i>
//               </p>
//               <p>
//                 <strong>Status: </strong> <i>{opportunity.status}</i>
//               </p>
//               <div className="flex flex-col sm:flex-row justify-start flex-wrap gap-3">
//                 <Button onClick={() => router.push(`/opportunities/${opportunity._id}`)}>
//                   View Details
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-red-400">No opportunities available</p>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getOpportunities, createOpportunity } from "@/services/opportunityService"; // Adjust the import paths if needed
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Opportunities() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [leadId, setLeadId] = useState("");
//   const [status, setStatus] = useState("");

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   // Fetch opportunities
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["opportunities"],
//     queryFn: getOpportunities,
//   });

//   // Create opportunity mutation
//   const mutation = useMutation(createOpportunity, {
//     onSuccess: () => {
//       // Invalidate and refetch the list after a new opportunity is added
//       queryClient.invalidateQueries(["opportunities"]);
//     },
//   });

//   // Handle form submission to add a new opportunity
//   const handleCreateOpportunity = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (leadId && status) {
//       mutation.mutate({
//         leadId,
//         status,
//       });
//       setLeadId(""); // Clear input fields
//       setStatus("");
//     }
//   };

//   // Filter opportunities based on the search term
//   const filteredOpportunities = data?.filter((opportunity: any) =>
//     ["_id", "leadId", "status"].some((key) =>
//       opportunity[key]?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   if (isLoading) return <div className="text-center my-4 text-2xl">Loading...</div>;
//   if (error) return <div>Error fetching opportunities</div>;

//   return (
//     <div className="my-10 max-w-[1200px] mx-auto">
//       <div className="flex flex-col items-center sm:flex-row justify-between ">
//         <h2 className="my-4 text-2xl font-bold">Opportunity List</h2>
//         <input
//           className="max-w-[400px] my-3 p-2 border"
//           placeholder="Search by ID, Lead ID, Status"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Form to create a new opportunity */}
//       <form onSubmit={handleCreateOpportunity} className="my-6 border-2 rounded-xl p-5">
//         <h3 className="text-xl font-semibold">Create New Opportunity</h3>
//         <div className="flex flex-col gap-4 my-4">
//           <input
//             type="text"
//             className="p-2 border"
//             placeholder="Enter Lead ID"
//             value={leadId}
//             onChange={(e) => setLeadId(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             className="p-2 border"
//             placeholder="Enter Status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             required
//           />
//           <Button type="submit" disabled={mutation.isLoading}>
//             {mutation.isLoading ? "Creating..." : "Create Opportunity"}
//           </Button>
//         </div>
//       </form>

//       <hr className="my-4" />

//       {/* Display the list of opportunities */}
//       <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//         {filteredOpportunities && filteredOpportunities.length > 0 ? (
//           filteredOpportunities.map((opportunity: any) => (
//             <div key={opportunity._id} className="p-3 break-words rounded-lg border-2 min-w-[120px]">
//               <p><strong>ID: </strong> <i>{opportunity._id}</i></p>
//               <p><strong>Lead ID: </strong> <i>{opportunity.leadId}</i></p>
//               <p><strong>Status: </strong> <i>{opportunity.status}</i></p>
//               <div className="flex flex-col sm:flex-row justify-start flex-wrap gap-3">
//                 <Button onClick={() => router.push(`/opportunities/${opportunity._id}`)}>View Details</Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-red-400">No opportunities available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// -------------------------------------------
// "use client";
// import { useRouter, useParams } from 'next/navigation'; // Import useParams for dynamic routes
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label'; // Import Label component from shadcn
// import { createOpportunity } from '@/services/opportunityService'; // You'll create this service

// export default function CreateOpportunity() {
//   const router = useRouter();
//   const params = useParams(); // Use useParams to access route params
//   const id = params?.id; // Extract leadId from URL params
//   const [opportunityName, setOpportunityName] = useState('');
//   const [expectedCloseDate, setExpectedCloseDate] = useState('');
//   const [projectValue, setProjectValue] = useState('');
//   const [opportunityStage, setOpportunityStage] = useState('Bid'); // Default stage

//   const handleSubmit = async () => {
//     try {
//       // Prepare opportunity data
//       const opportunityData = {
//         linkedCustomerOrLead: id,
//         opportunityName,
//         expectedCloseDate,
//         projectValue,
//         stage: opportunityStage, // update key to match backend schema
//       };

//       // Call the API to create an opportunity
//       await createOpportunity(opportunityData);

//       // Redirect to opportunities list page or opportunity details page
//       router.push(`/opportunities/${id}`);
//     } catch (error) {
//       console.error('Error creating opportunity:', error);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto my-10">
//       <h2 className="text-2xl font-bold mb-4">Create Opportunity</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         {/* Lead ID (non-editable) */}
//         <div className="mb-4">
//           <Label htmlFor="linkedCustomerOrLead" className="block font-bold  my-2 ">Lead ID</Label>
//           <Input id="linkedCustomerOrLead" value={id} disabled className="bg-gray-900 cursor-not-allowed" />
//         </div>

//         {/* Opportunity Name */}
//         <div className="mb-4">
//           <Label htmlFor="opportunityName" className="block font-bold my-2">Opportunity Name</Label>
//           <Input
//             id="opportunityName"
//             value={opportunityName}
//             onChange={(e) => setOpportunityName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Expected Close Date */}
//         <div className="mb-4">
//           <Label htmlFor="expectedCloseDate" className="block font-bold my-2">Expected Close Date</Label>
//           <Input
//             id="expectedCloseDate"
//             type="date"
//             value={expectedCloseDate}
//             onChange={(e) => setExpectedCloseDate(e.target.value)}
//             required
//           />
//         </div>

//         {/* Project Value */}
//         <div className="mb-4">
//           <Label htmlFor="projectValue" className="block font-bold my-2">Project Value</Label>
//           <Input
//             id="projectValue"
//             type="number"
//             value={projectValue}
//             onChange={(e) => setProjectValue(e.target.value)}
//             required
//           />
//         </div>

//         {/* Opportunity Stage */}
//         <div className="mb-4">
//           <Label htmlFor="stage" className="block font-bold my-2">Opportunity Stage</Label>
//           <Input id="stage" value={opportunityStage} disabled className="bg-gray-900 cursor-not-allowed" />
          

//         </div>

//         <Button onClick={handleSubmit} className="mt-4">Create Opportunity</Button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createOpportunity, getOpportunities } from '@/services/opportunityService'; // Import createOpportunity and getOpportunities services

export default function CreateOpportunity() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [opportunityName, setOpportunityName] = useState('');
  const [expectedCloseDate, setExpectedCloseDate] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [opportunityStage, setOpportunityStage] = useState('Bid');
  const [assignedSalesRep, setAssignedSalesRep] = useState('');
  const [revenueForecast, setRevenueForecast] = useState('');
  const [probabilityOfClosing, setProbabilityOfClosing] = useState('');
  const [opportunities, setOpportunities] = useState([]); // State for opportunities list

  useEffect(() => {
    // Fetch existing opportunities when component mounts
    const fetchOpportunities = async () => {
      try {
        const fetchedOpportunities = await getOpportunities();
        console.log(fetchOpportunities)
        setOpportunities(fetchedOpportunities);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };
    fetchOpportunities();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const opportunityData = {
        linkedCustomerOrLead: id,
        opportunityName,
        expectedCloseDate,
        projectValue,
        stage: opportunityStage,
        assignedSalesRep,
        revenueForecast: Number(revenueForecast),
        probabilityOfClosing: Number(probabilityOfClosing),
      };
      await createOpportunity(opportunityData);
      // router.push(`/opportunities/${id}`);
      router.push('/leads')
    } catch (error) {
      console.error('Error creating opportunity:', error);
    }
  };

  return (
    <>
      <main className=''>
        <div className="max-w-xl mx-auto px-10 my-10">
          <h2 className="text-2xl text-center font-bold mb-4">Create Opportunity</h2>
          <form className='max-w-[800px] p-3 rounded-lg border-2 mx-auto' onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <Label htmlFor="linkedCustomerOrLead" className="block font-bold  my-2 ">Lead ID</Label>
              <Input id="linkedCustomerOrLead" value={id} disabled className="bg-gray-900 cursor-not-allowed" />
            </div>
            <div className="mb-4">
              <Label htmlFor="opportunityName" className="block font-bold my-2">Opportunity Name</Label>
              <Input
                id="opportunityName"
                value={opportunityName}
                onChange={(e) => setOpportunityName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="expectedCloseDate" className="block font-bold my-2">Expected Close Date</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={expectedCloseDate}
                onChange={(e) => setExpectedCloseDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="projectValue" className="block font-bold my-2">Project Value</Label>
              <Input
                id="projectValue"
                type="number"
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="assignedSalesRep" className="block font-bold my-2">Assigned Sales Rep</Label>
              <Input
                id="assignedSalesRep"
                value={assignedSalesRep}
                onChange={(e) => setAssignedSalesRep(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="revenueForecast" className="block font-bold my-2">Revenue Forecast</Label>
              <Input
                id="revenueForecast"
                type="number"
                value={revenueForecast}
                onChange={(e) => setRevenueForecast(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="probabilityOfClosing" className="block font-bold my-2">Probability of Closing (%)</Label>
              <Input
                id="probabilityOfClosing"
                type="number"
                value={probabilityOfClosing}
                onChange={(e) => setProbabilityOfClosing(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="stage" className="block font-bold my-2">Opportunity Stage</Label>
              <Input id="stage" value={opportunityStage} disabled className="bg-gray-900 cursor-not-allowed" />
            </div>
            <Button onClick={handleSubmit} className="mt-4">Create Opportunity</Button>
          </form>
        </div>

        
        {/* <div className="my-10 max-w-[1200px] mx-auto">
          <h2 className="my-4 text-2xl font-bold">Opportunity List</h2>
          {opportunities.length > 0 ? (
            <ul className="space-y-4">
              {opportunities.map((opportunity:any) => (
                <li key={opportunity._id} className="p-4 border rounded-lg">
                  <h3 className="font-bold text-xl">{opportunity.opportunityName}</h3>
                  <p>Expected Close Date: {opportunity.expectedCloseDate}</p>
                  <p>Project Value: {opportunity.projectValue}</p>
                  <p>Stage: {opportunity.stage}</p>
                  <p>Assigned Sales Rep: {opportunity.assignedSalesRep}</p>
                  <p>Revenue Forecast: {opportunity.revenueForecast}</p>
                  <p>Probability of Closing: {opportunity.probabilityOfClosing}%</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg">No opportunities available for this lead.</p>
          )}
        </div> */}
      </main>
    </>
  );
}
