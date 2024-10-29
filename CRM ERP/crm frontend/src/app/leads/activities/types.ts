// types/index.ts
export interface IActivity {
    _id: string;
    leadId: string;
    activityType: string
    description: string;
    dateTime: Date;
    assignedSalesRep: string;
  }
  
  export interface CreateActivityInput {
    leadId: string;
    activityType: 'Call' | 'Email' | 'Meeting';
    description: string;
    assignedSalesRep: string;
    dateTime?: Date;
  }
  