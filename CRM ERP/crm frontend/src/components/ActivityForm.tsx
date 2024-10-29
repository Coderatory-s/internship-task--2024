"use client"
import { useState } from "react";
import { useLogActivity } from "../services/useLogActivity";
import { useActivityStore } from "../store/activityStore";
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Shadcn Select
import { Label } from "@/components/ui/label";

interface ActivityFormProps {
  leadId: string;
}

export default function ActivityForm({ leadId }: ActivityFormProps) {
  const [activityType, setActivityType] = useState("Call");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [salesRep, setSalesRep] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Local state for loading status
  const { addActivity } = useActivityStore();

  // React Query Mutation for logging activity
  const { mutate } = useLogActivity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    const activityData = {
      leadId,
      activityType,
      description,
      dateTime: date, // Use 'dateTime' if your API expects this field
      assignedSalesRep: salesRep, // Update this line
    };

    mutate(activityData, {
      onSuccess: (data) => {
        addActivity(data); // Add the new activity to Zustand store
        // Clear form fields
        setActivityType("Call");
        setDescription("");
        setDate("");
        setSalesRep("");
      },
      onError: (error) => {
        console.error("Error logging activity:", error.message);
      },
      onSettled: () => {
        setIsSubmitting(false); // End loading
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-[800px] mx-auto border-2 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Log an Activity</h3>
      <div className="mb-4">
        <Label className="block font-medium mb-2">Lead ID</Label>
        <Input
          value={leadId}
          readOnly // Make this field read-only
          className="w-full text-gray-350 cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <Label className="block font-medium mb-2">Activity Type</Label>
        <Select value={activityType} onValueChange={setActivityType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Activity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Call">Call</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Meeting">Meeting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label className="block font-medium mb-2">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the interaction"
          className="w-full"
          required
        />
      </div>

      <div className="mb-4">
        <Label className="block font-medium mb-2">Date & Time</Label>
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div className="mb-4">
        <Label className="block font-medium mb-2">Assigned Sales Representative</Label>
        <Input
          value={salesRep}
          onChange={(e) => setSalesRep(e.target.value)}
          placeholder="Enter sales representative name"
          className="w-full"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging Activity..." : "Log Activity"}
      </Button>
    </form>
  );
}
