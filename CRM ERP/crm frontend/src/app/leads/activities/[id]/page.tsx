"use client"
import {useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import { useActivityStore } from "@/store/activityStore";
import { IActivity } from "@/app/leads/activities/types";
import { fetchActivitiesByLeadId } from "@/services/activityService";
import {Button} from "@/components/ui/button"
import {Loader2} from "lucide-react"
export default function LeadActivitiesPage() {
  const { id } = useParams();
  const { addActivity } = useActivityStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true); // Set loading state
      try {
        if (id) {
          const response = await fetchActivitiesByLeadId(id as string);
         response?.data.forEach((activity: IActivity) => {
            addActivity(activity);
          });
        }
      } catch (error:any) {
        console.error(`Error fetching activities: ${error}`);
        setError(error.message);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchActivities();
    
    return () => {
      // Cleanup logic if necessary
    };
  }, [id]);

  if (loading) return (<div className="text-center min-h-screen flex items-center justify-center"> <Button disabled>
  <Loader2 className="mr-2 h-7 w-7 animate-spin" />
Loading! Please wait...
</Button>
  </div>)
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-6">
        Activities for Lead ID: <span className="text-green-400">{id}</span>
      </h1>
      <ActivityForm leadId= {id as string}/>
<hr className="my-10"/>
      {/* Include ActivityForm and ActivityList components here */}
      <ActivityList leadId= {id as string}/>
    </div>
  );
}