import leadRepository from '../repositories/leadRepository';
import Lead from '../models/leadModel'; // Import the Lead model
import { ILead } from '../models/leadModel';
import Opportunity from './oppModel';

const createLead = async (leadData: ILead) => {
  // Check if a lead with the same email already exists
  const existingLead = await Lead.findOne({ email: leadData.email });
  if (existingLead) {
    throw new Error('Email already in use. Please use a different email address.');
  }

  // Proceed to create the new lead
  return await leadRepository.createLead(leadData);
};
// Get all leads
const getAllLeads = async (): Promise<ILead[]> => {
  return await leadRepository.getAllLeads();
};

// Get a lead by ID
const getLeadById = async (id: string): Promise<ILead | null> => {
  return await leadRepository.getLeadById(id);
};

// Update a lead
const updateLead = async (id: string, leadData: Partial<ILead>): Promise<ILead | null> => {
  return await leadRepository.updateLead(id, leadData);
};

// Delete a lead
const deleteLead = async (id: string): Promise<ILead | null> => {
  return await leadRepository.deleteLead(id);
};

const updateLeadStatus = async (id: string, status: string) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');

  lead.status = status;
  return await lead.save();
};

const convertLead = async (id: string) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');

  // Check if an opportunity already exists for this lead
  const existingOpportunity = await Opportunity.findOne({ leadId: lead._id });
  if (existingOpportunity) {
    return { isAlreadyConverted: true, opportunity: existingOpportunity }; // Return existing opportunity
  }

  // Create a new opportunity if one doesn't exist
  const opportunity = new Opportunity({
    leadId: lead._id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    leadSource: lead.leadSource,
});

await opportunity.save();
console.log(opportunity); // Debugging line

return { isAlreadyConverted: false, opportunity };
};
// const convertLead = async (id: string) => {
//   const lead = await Lead.findById(id);
//   if (!lead) throw new Error('Lead not found');

//   // Check if an opportunity already exists for this lead
//   const existingOpportunity = await Opportunity.findOne({ leadId: lead._id });
//   if (existingOpportunity) {
//     // Return the existing opportunity if already converted
//     return { isAlreadyConverted: true, opportunity: existingOpportunity };
//   }

//   // Create a new opportunity if one doesn't exist
//   const opportunity = new Opportunity({
//     leadId: lead._id,
//     name: lead.name,
//     email: lead.email,
//     phone: lead.phone,
//     leadSource: lead.leadSource,
//     // Add other necessary fields
//   });

//   await opportunity.save();
//   // Optionally delete or archive the lead
//   return { isAlreadyConverted: false, opportunity }; // Return the new opportunity
// };



export default {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  convertLead
};