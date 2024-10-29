import * as activityService from '../services/activityServices';
import Activity from '../models/activityModel';
import { Types } from 'mongoose';

jest.mock('../models/activityModel');

describe('Activity Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new activity', async () => {
    const mockActivity = { 
      leadId: new Types.ObjectId(), 
      activityType: 'Call', 
      description: 'Discussed project', 
      dateTime: new Date(), 
      assignedSalesRep: 'Rep A' 
    };

    (Activity.prototype.save as jest.Mock).mockResolvedValue(mockActivity);

    const result = await activityService.createActivity(mockActivity);
    expect(result).toEqual(mockActivity);
    expect(Activity.prototype.save).toHaveBeenCalled();
  });

  test('should get an activity by ID', async () => {
    const mockActivity = { 
      leadId: new Types.ObjectId(), 
      activityType: 'Email', 
      description: 'Follow-up email', 
      dateTime: new Date(), 
      assignedSalesRep: 'Rep B' 
    };

    (Activity.findById as jest.Mock).mockResolvedValue(mockActivity);

    const result = await activityService.getActivityById('activityId');
    expect(result).toEqual(mockActivity);
    expect(Activity.findById).toHaveBeenCalledWith('activityId');
  });

  test('should update an activity by ID', async () => {
    const mockUpdatedActivity = { 
      leadId: new Types.ObjectId(), 
      activityType: 'Meeting', 
      description: 'Discussed scope', 
      dateTime: new Date(), 
      assignedSalesRep: 'Rep C' 
    };

    (Activity.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedActivity);

    const result = await activityService.updateActivity('activityId', { description: 'Updated description' });
    expect(result).toEqual(mockUpdatedActivity);
    expect(Activity.findByIdAndUpdate).toHaveBeenCalledWith('activityId', { description: 'Updated description' }, { new: true });
  });

  test('should delete an activity by ID', async () => {
    const mockDeletedActivity = { 
      leadId: new Types.ObjectId(), 
      activityType: 'Call', 
      description: 'Discussed closure', 
      dateTime: new Date(), 
      assignedSalesRep: 'Rep D' 
    };

    (Activity.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedActivity);

    const result = await activityService.deleteActivity('activityId');
    expect(result).toEqual(mockDeletedActivity);
    expect(Activity.findByIdAndDelete).toHaveBeenCalledWith('activityId');
  });
});
