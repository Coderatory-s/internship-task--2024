
// import leadService from './leadService'; // Adjust the path as necessary
// import Lead from '../models/leadModel'; // Import your Lead model
// import Opportunity from './oppModel'; // Import your Opportunity model
// import leadRepository from '../repositories/leadRepository'; // Import the lead repository
// import { ILead } from '../models/leadModel';
// // Mocking the Mongoose models and lead repository
// jest.mock('../models/leadModel');
// jest.mock('./oppModel');
// jest.mock('../repositories/leadRepository');

// describe('Lead Service', () => {
//     const leadData = {
//         _id: '123123',
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         phone: '123-456-7890',
//         leadSource: 'Web',
//         status: 'qualified',
//       } as ILead;
     

//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear mocks before each test
//   });

//   describe('createLead', () => {
//     it('should create a lead if the email is unique', async () => {
//       (Lead.findOne as jest.Mock).mockResolvedValue(null); // No existing lead
//       (leadRepository.createLead as jest.Mock).mockResolvedValue(leadData);

//       const result = await leadService.createLead(leadData);

//       expect(result).toEqual(leadData);
//       expect(leadRepository.createLead).toHaveBeenCalledWith(leadData);
//     });

//     it('should throw an error if the email is already in use', async () => {
//       (Lead.findOne as jest.Mock).mockResolvedValue(leadData); // Existing lead

//       await expect(leadService.createLead(leadData)).rejects.toThrow(
//         'Email already in use. Please use a different email address.'
//       );
//     });
//   });

//   describe('getAllLeads', () => {
//     it('should return all leads', async () => {
//       const leadsArray = [leadData];
//       (leadRepository.getAllLeads as jest.Mock).mockResolvedValue(leadsArray);

//       const result = await leadService.getAllLeads();

//       expect(result).toEqual(leadsArray);
//       expect(leadRepository.getAllLeads).toHaveBeenCalled();
//     });
//   });

//   describe('getLeadById', () => {
//     it('should return a lead by ID', async () => {
//       (leadRepository.getLeadById as jest.Mock).mockResolvedValue(leadData);

//       const result = await leadService.getLeadById('leadId123');

//       expect(result).toEqual(leadData);
//       expect(leadRepository.getLeadById).toHaveBeenCalledWith('leadId123');
//     });
//   });

//   describe('updateLead', () => {
//     it('should update a lead', async () => {
//       const updateData = { name: 'Jane Doe' };
//       (leadRepository.updateLead as jest.Mock).mockResolvedValue({ ...leadData, ...updateData });

//       const result = await leadService.updateLead('leadId123', updateData);

//       expect(result).toEqual({ ...leadData, ...updateData });
//       expect(leadRepository.updateLead).toHaveBeenCalledWith('leadId123', updateData);
//     });
//   });

//   describe('deleteLead', () => {
//     it('should delete a lead', async () => {
//       (leadRepository.deleteLead as jest.Mock).mockResolvedValue(leadData);

//       const result = await leadService.deleteLead('leadId123');

//       expect(result).toEqual(leadData);
//       expect(leadRepository.deleteLead).toHaveBeenCalledWith('leadId123');
//     });
//   });

//   describe('updateLeadStatus', () => {
//     it('should update the status of a lead', async () => {
//       (Lead.findById as jest.Mock).mockResolvedValue({ ...leadData, save: jest.fn().mockResolvedValue(leadData) });

//       const result = await leadService.updateLeadStatus('leadId123', 'converted');

//       expect(result).toEqual(leadData);
//       expect(Lead.findById).toHaveBeenCalledWith('leadId123');
//     });

//     it('should throw an error if the lead is not found', async () => {
//       (Lead.findById as jest.Mock).mockResolvedValue(null);

//       await expect(leadService.updateLeadStatus('invalidId', 'converted')).rejects.toThrow('Lead not found');
//     });
//   });

//   describe('convertLead', () => {
//     it('should convert a qualified lead into an opportunity', async () => {
//       (Lead.findById as jest.Mock).mockResolvedValue(leadData);
//       (Opportunity.findOne as jest.Mock).mockResolvedValue(null); // No existing opportunity

//       const result = await leadService.convertLead('leadId123');

//       expect(result).toHaveProperty('isAlreadyConverted', false);
//       expect(result.opportunity).toHaveProperty('leadId', leadData._id);
//       expect(result.opportunity).toHaveProperty('name', leadData.name);
//       expect(result.opportunity).toHaveProperty('email', leadData.email);
//       expect(result.opportunity).toHaveProperty('phone', leadData.phone);
//       expect(result.opportunity).toHaveProperty('leadSource', leadData.leadSource);
//     });

//     it('should return an existing opportunity if already converted', async () => {
//       const existingOpportunity = {
//         _id: 'opportunityId123',
//         leadId: leadData._id,
//         name: 'Project ABC Bid',
//       };

//       (Lead.findById as jest.Mock).mockResolvedValue(leadData);
//       (Opportunity.findOne as jest.Mock).mockResolvedValue(existingOpportunity); // Mock existing opportunity

//       const result = await leadService.convertLead('leadId123');

//       expect(result).toHaveProperty('isAlreadyConverted', true);
//       expect(result.opportunity).toEqual(existingOpportunity);
//     });

//     it('should throw an error if the lead is not found', async () => {
//       (Lead.findById as jest.Mock).mockResolvedValue(null);

//       await expect(leadService.convertLead('invalidId')).rejects.toThrow('Lead not found');
//     });
//   });
// });

import leadService from '../services/leadService';
import Lead from '../models/leadModel';
import leadRepository from '../repositories/leadRepository';
import { ILead } from '../models/leadModel';

jest.mock('../models/leadModel');
jest.mock('../repositories/leadRepository');

describe('Lead Service', () => {
  const leadData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    leadSource: 'Web',
    status: 'New',
  } as ILead;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLead', () => {
    it('should create a lead if the email is unique', async () => {
      (Lead.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing lead
      (leadRepository.createLead as jest.Mock).mockResolvedValue(leadData);

      const result = await leadService.createLead(leadData);

      expect(result).toEqual(leadData);
      expect(leadRepository.createLead).toHaveBeenCalledWith(leadData);
    });

    it('should throw an error if the email is already in use', async () => {
      (Lead.findOne as jest.Mock).mockResolvedValue(leadData); // Simulate existing lead

      await expect(leadService.createLead(leadData)).rejects.toThrow(
        'Email already in use. Please use a different email address.'
      );
    });
  });
});
