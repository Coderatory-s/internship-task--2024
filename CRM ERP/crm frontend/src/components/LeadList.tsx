"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLeads, deleteLead, qualifyLead, convertLeadToOpportunity } from "../services/leadService";
import { useLeadStore } from "@/store/LeadStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OpportunitiesList from "./OpportunitiesList";

export default function LeadList() {
  const { leads, setLeads } = useLeadStore();
  const [editingLead, setEditingLead] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [qualifyLeadId, setQualifyLeadId] = useState<string | null>(null);
  const [convertLeadId, setConvertLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: leadsData, isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

 
  useEffect(() => {
    if (leadsData) setLeads(leadsData.data);
  }, [leadsData, setLeads]);

  const handleEdit = (lead: any) => {
    setEditingLead(lead);
    setFormVisible(true);
  };

  const handleDelete = async () => {
    if (deleteLeadId) {
      try {
        await deleteLead(deleteLeadId);
        queryClient.invalidateQueries({ queryKey: ["leads"] });
        setDeleteLeadId(null);
        router.push("/leads");
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  const handleQualifyLead = async (id: string) => {
    try {
      await qualifyLead(id, { status: "Qualified" });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    } catch (error) {
      console.error("Error qualifying lead:", error);
    }
  };

  const handleConvertToOpportunity = (id: string) => {
    router.push(`/opportunities/${id}`);
  };

  const filteredLeads = leads.filter((lead: any) =>
    ["_id", "name", "email", "status", "leadSource"].some((key) =>
      lead[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) return <div className="text-center my-4 text-2xl"><Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
Loading! Please wait...</Button></div>;
  if (error) return <div className="text-center my-4 text-2xl text-red-400">Error fetching leads</div>;

  return (
    <div className="my-10 max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center sm:flex-row justify-between ">
        <h2 className="my-4 text-2xl font-bold">Lead List</h2>
        <Input
          className="max-w-[400px] my-3"
          placeholder="Search by ID, Name, Email, Status, Lead Source"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <OpportunitiesList/>
       
      </div>
      <hr className="my-4" />

      {/* Leads List */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl-grid-cols-4 ">
        {filteredLeads && filteredLeads.length > 0 ? (
          filteredLeads.map((lead: any) => (
            <div key={lead._id} className="relative hover:scale-105 duration-200 transition-all p-3 min-h-[410px] sm:min-h-[300px] break-words rounded-lg border-2 min-w-[120px]">
              {/* Lead details */}
              {/* Edit, Qualify, Convert, Delete, and Check Activity buttons */}
              <p><strong>ID: </strong> <i className="text-green-500 font-bold">{lead._id}</i></p>
              <h3><strong>Name: </strong> <i>{lead.name}</i></h3>
              <p><strong>Email: </strong> <i>{lead.email}</i></p>
              <p><strong>Phone: </strong> <i>{lead.phone}</i></p>
              <p><strong>Lead Source: </strong> <i>{lead.leadSource}</i></p>
              <p><strong>Status: </strong> <i>{lead.status}</i></p>
              <div className="flex flex-col sm:flex-row my-2 justify-start flex-wrap gap-2">
                {/* Edit Button */}
                <Dialog open={isFormVisible} onOpenChange={setFormVisible}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleEdit(lead)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle className="text-center font-bold">Edit Lead</DialogTitle>
                    </DialogHeader>
                    <LeadForm
                      isEditing={true}
                      leadToEdit={editingLead}
                      onClose={() => {
                        setFormVisible(false);
                        setEditingLead(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                {/* Qualify Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setQualifyLeadId(lead._id)}
                      disabled={lead.status === "Qualified"}
                      className={lead.status === "Qualified" ? "bg-gray-500 cursor-not-allowed" : ""}
                    >
                      {lead.status === "Qualified" ? "Qualified" : "Qualify Lead"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">Are you sure you want to qualify this lead?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="destructive" onClick={() => handleQualifyLead(lead._id)}>Yes</Button>
                      <DialogTrigger asChild>
                        <Button className="bg-white text-black" onClick={() => setQualifyLeadId(null)}>No</Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Convert to Opportunity Button */}
                {lead.status === "Qualified" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setConvertLeadId(lead._id)}>Convert to Opportunity</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900">
                      <DialogHeader>
                        <DialogTitle className="text-red-400">Convert Lead to Opportunity?</DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-2">
                        <Button variant="destructive" onClick={() => handleConvertToOpportunity(lead._id)}>Yes</Button>
                        <DialogTrigger asChild>
                          <Button variant="destructive" onClick={() => setConvertLeadId(null)}>No</Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Delete Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" onClick={() => setDeleteLeadId(lead._id)}>
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">Are you sure you want to delete this lead?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="destructive" onClick={handleDelete}>Yes</Button>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-black" onClick={() => setDeleteLeadId(null)}>No</Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="my-1 absolute bottom-2 right-2">
                <Link className="border-2 transition-all duration-300 rounded-lg hover:bg-slate-200 p-1 mt-2 hover:text-black" href={`leads/activities/${lead._id}`}>
                  Log Activity
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-400 text-xl">No leads available</p>
        )}
      </div>
    </div>
  );
}
