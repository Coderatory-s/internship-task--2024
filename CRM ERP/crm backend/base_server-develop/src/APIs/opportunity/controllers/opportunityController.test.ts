// opportunityController.test.ts
import { Request, Response } from 'express';
import { createOpportunity } from '../controllers/opportunityController';
import opportunityService from '../services/opportunityService';
import { opportunitySchema } from '../validations/opportunityValidation';

jest.mock('../services/opportunityService');

describe('Opportunity Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {
        leadId: '60c72b2f9b1d4a3d8c8a5a5a',
        projectName: 'New Project',
        expectedCloseDate: new Date(),
        projectValue: 5000,
        stage: 'Bid'
      }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should create an opportunity and return 201 status', async () => {
    const opportunityData = { id: '1', ...mockRequest.body };
    (opportunityService.createOpportunity as jest.Mock).mockResolvedValue(opportunityData);

    await createOpportunity(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      message: 'Opportunity created successfully', 
      data: opportunityData 
    });
  });

  it('should return 400 if validation fails', async () => {
    mockRequest.body.projectName = ''; // Invalid projectName
    const { error } = opportunitySchema.validate(mockRequest.body);
    
    await createOpportunity(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: error?.details[0].message
    });
  });

  it('should call next with error if service fails', async () => {
    const error = new Error('Database error');
    (opportunityService.createOpportunity as jest.Mock).mockRejectedValue(error);

    await createOpportunity(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(error);
  });
}); 