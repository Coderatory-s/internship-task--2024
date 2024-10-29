'use client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { getOpportunities, updateOpportunityStage } from "../services/opportunityService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const OpportunitiesList = () => {
    const [isOpportunityDialogOpen, setOpportunityDialogOpen] = useState(false);
    const [editingOpportunity, setEditingOpportunity] = useState<string | null>(null);
    const [newStage, setNewStage] = useState("");
    const [isUpdatingStage, setIsUpdatingStage] = useState(false); // Manage loading state here

    const queryClient = useQueryClient();

    const { data: opportunitiesData, isLoading: isLoadingOpportunities } = useQuery({
        queryKey: ["opportunities"],
        queryFn: getOpportunities,
        enabled: isOpportunityDialogOpen, // Fetch data when dialog is open
    });

    const allowedStages = ["Bid", "Negotiation", "Closed Won", "Closed Lost"];

    const { mutate: mutateUpdateStage } = useMutation({
        mutationFn: ({ id, stage }: { id: string; stage: string }): Promise<any> => updateOpportunityStage(id, stage),
        onSuccess: () => {
            toast.success("Opportunity stage updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["opportunities"] });
            setEditingOpportunity(null);
            setNewStage(""); // Clear newStage after update
        },
        onError: () => {
            toast.error("Failed to update opportunity stage.");
        },
    });

    const handleStageUpdate = (id: string) => {
        const trimmedStage = newStage.trim();

        if (trimmedStage === "") {
            toast.error("Stage cannot be empty!");
            return;
        }
        if (!allowedStages.includes(trimmedStage)) {
            toast.error(`Stage must be one of: ${allowedStages.join(", ")}`);
            return;
        }

        setIsUpdatingStage(true); // Set loading state to true when updating
        mutateUpdateStage({ id, stage: trimmedStage }, {
            onSettled: () => setIsUpdatingStage(false), // Reset loading state after mutation is settled
        });
    };

    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    useEffect(() => {
        if (isOpportunityDialogOpen) {
            // Reset state when dialog opens
            setNewStage(""); 
            setEditingOpportunity(null);
        }
    }, [isOpportunityDialogOpen]);

    const router = useRouter();

    const handleConvertToProject = (id: string) => {
         router.push(`/projects/${id}`);
    };

    return (
        <div>
            <Dialog open={isOpportunityDialogOpen} onOpenChange={setOpportunityDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant={"ghost"} className='bg-black font-bold duration-300 transition-all'>Opportunities List</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 rounded-xl flex flex-col text-white overflow-y-auto h-[550px] max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle className="text-center font-bold my-3 text-xl underline">Opportunities List</DialogTitle>
                    </DialogHeader>

                    {isLoadingOpportunities ? (
                        <div className="text-center my-4 text-2xl">
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading opportunities...
                            </Button>
                        </div>
                    ) : opportunitiesData && opportunitiesData.data?.length > 0 ? (
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {opportunitiesData?.data?.map((opportunity: any) => (
                                <main key={opportunity._id} className="p-3 hover:scale-105 transition-all duration-200 break-words rounded-lg border-2 min-w-[120px]">
                                    <div>
                                        <p><strong>ID: </strong> <i className='text-green-500 font-bold'>{opportunity._id}</i></p>
                                        <h3><strong>Opportunity Name: </strong> <i>{opportunity.opportunityName}</i></h3>
                                        <p><strong>Linked Lead ID: </strong> <i>{opportunity.linkedCustomerOrLead}</i></p>
                                        <p><strong>Expected Close Date: </strong> <i>{new Date(opportunity.expectedCloseDate).toLocaleDateString(undefined, dateFormatOptions)}</i></p>
                                        <p><strong>Project Value: </strong> <i>{opportunity.projectValue}</i></p>
                                        <p><strong>Revenue Forecast: </strong> <i>{opportunity.revenueForecast}</i></p>
                                        <p><strong>Probability of Closing (%): </strong> <i>{opportunity.probabilityOfClosing}</i></p>
                                        <p><strong>Status: </strong> <i>{opportunity.stage}</i></p>

                                        {opportunity.stage === "Closed Won" ? (
                                            <Button
                                                variant={"ghost"}
                                                onClick={() => handleConvertToProject(opportunity._id)}
                                                className="my-2 bg-blue-500 font-bold"
                                            >
                                                Convert this opportunity to Project
                                            </Button>
                                        ) : editingOpportunity === opportunity._id ? (
                                            <div>
                                                <Input
                                                    value={newStage}
                                                    onChange={(e) => setNewStage(e.target.value)}
                                                    placeholder="Enter new stage"
                                                    className="my-2"
                                                />
                                                <Button
                                                    onClick={() => handleStageUpdate(opportunity._id)}
                                                    disabled={isUpdatingStage}
                                                    className="mr-2"
                                                >
                                                    {isUpdatingStage ? 'Updating...' : 'Save'}
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setEditingOpportunity(null);
                                                        setNewStage(""); // Reset newStage when cancelling
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant={"outline"}
                                                className='text-black font-bold my-1'
                                                onClick={() => {
                                                    setEditingOpportunity(opportunity._id);
                                                    setNewStage(opportunity.stage);
                                                }}
                                                disabled={opportunity.stage === "Closed Won"} // Disable when the stage is Closed Won
                                            >
                                                Edit Stage
                                            </Button>
                                        )}
                                    </div>
                                </main>
                            ))}
                        </div>
                    ) : (
                        <p className="text-red-400">No opportunities available</p>
                    )}

                    <DialogFooter className="flex justify-end mt-4">
                        <Button variant="destructive" onClick={() => setOpportunityDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OpportunitiesList;
