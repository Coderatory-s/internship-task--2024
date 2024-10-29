import { useActivityStore } from "../store/activityStore";
import { useEffect, useState } from "react";
import { fetchActivitiesByLeadId, deleteActivity } from "@/services/activityService";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function ActivityList(props: { leadId: string }) {
  const { activities, clearActivities,addActivity } = useActivityStore();
  const [deleteActivityId, setDeleteActivityId] = useState<string | null>(null);

  const filteredActivities = activities.filter((activity) => activity.leadId === props.leadId);

  useEffect(() => {
    clearActivities(); // Clear previous activities when leadId changes
    fetchActivitiesByLeadId(props.leadId).then((data) => {
      // Update the activities in the store here if needed
    });
  }, [props.leadId, clearActivities]);

   const handleDelete = async () => {
    if (deleteActivityId) {
      try {
        await deleteActivity(deleteActivityId);
        const updatedActivities = await fetchActivitiesByLeadId(props.leadId);
        // Update the activities in your store or state here
        clearActivities(); // Clear the previous activities
        // Update the activities in your store or state with updatedActivities
      } catch (error) {
        console.error("Error deleting activity:", error);
      } finally {
        setDeleteActivityId(null);
      }
    }
  };
  
  return (
    <div className="max-w-[1000px] mx-auto">
      <h3 className="text-xl  font-semibold mb-4 underline">Logged Activities</h3>
      {filteredActivities.length > 0 ? (
        <ul className=" space-y-4">
          {filteredActivities.map((activity, index) => (
            <li key={index} className="p-4 border hover:bg-gray-500 rounded-md shadow-md">
              <p><strong>ID:</strong> <span className="text-green-400">{activity._id}</span></p>
              <p><strong>LeadID:</strong> {activity.leadId}</p>
              <p><strong>Type:</strong> {activity.activityType}</p>
              <p><strong>Description:</strong> {activity.description}</p>
              <p><strong>Date:</strong> {new Date(activity.dateTime).toLocaleString()}</p>
              <p><strong>Sales Rep:</strong> {activity.assignedSalesRep}</p>

              <div className="flex gap-3 my-2">
               
                {/* Delete Button */}
                {/* <Dialog open={!!deleteActivityId} onOpenChange={() => setDeleteActivityId(null)}> */}
                <Dialog open={!!deleteActivityId} onOpenChange={(open) => {if(!open)setDeleteActivityId(null);}}>

                  <DialogTrigger asChild>
                    <Button variant="destructive" onClick={() => setDeleteActivityId(activity._id)}>Delete</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">Are you sure you want to delete this activity?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="destructive" className="font-bold" onClick={handleDelete}>Yes</Button>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-black font-bold" onClick={() => setDeleteActivityId(null)}>No</Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-400 font-bold text-lg">No activities logged yet.</p>
      )}
    </div>
  );
}
