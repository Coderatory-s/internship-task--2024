// src/app/leads/types.ts
export interface Lead {
    _id: string
    name: string;
    email: string;
    phone: string;
    leadSource: string;
    status: 'New' | 'In Progress' | 'Closed';
  }
  