import { create } from 'zustand';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  leadSource: string;
  status: string;
}

interface LeadStore {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  setLeads: (leads: Lead[]) => set({ leads }),
}));
