import Lead, { ILead } from '../models/leadModel';

const createLead = async (leadData: ILead): Promise<ILead> => {
  const lead = new Lead(leadData);
  return await lead.save();
};

// Get all leads
const getAllLeads = async (): Promise<ILead[]> => {
  const leads = await Lead.find();
  return leads;
};


// Get lead by ID
const getLeadById = async (id: string): Promise<ILead | null> => {
  return await Lead.findById(id);
};

// Update a lead
const updateLead = async (id: string, leadData: Partial<ILead>): Promise<ILead | null> => {
  return await Lead.findByIdAndUpdate(id, leadData, { new: true });
};

// Delete a lead
const deleteLead = async (id: string): Promise<ILead | null> => {
  return await Lead.findByIdAndDelete(id);
};
export default {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};
