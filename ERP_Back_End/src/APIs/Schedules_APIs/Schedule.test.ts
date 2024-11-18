// import request from 'supertest';
import  post  from '../Schedules_APIs/Schedule/_shared_schedule/repo/post_schdule';
import Schedule_DB from '../Schedules_APIs/Schedule/_shared_schedule/models/Schedule';
import { parse, isValid } from 'date-fns';

jest.mock('../Schedules_APIs/Schedule/_shared_schedule/models/Schedule'); 

jest.mock('date-fns', () => ({
  parse: jest.fn(),
  isValid: jest.fn(),
}));

describe('Schedule Service - get_services', () => {
    it('should return all schedules', async () => {
      const mockSchedules = [
        {
          _id: '6123abcd1234567890123456',
          type: 'Interview',
          job_position: 'Software Engineer',
          participants: ['John Doe'],
          interviewer: 'Jane Smith',
          meeting_room: 'Room A',
          date: new Date(),
          start_time: '10:00 14:00',
          end_time: '11:00 01:00',
          description: 'Interview for SE position',
          host: 'HR',
          status: 'Pending',
        },
      ];
  
      (Schedule_DB.find as jest.Mock).mockResolvedValue(mockSchedules);
  
      const schedules = await post.get_services();
      expect(Schedule_DB.find).toHaveBeenCalledTimes(1); 
      expect(schedules).toEqual(mockSchedules); 
    });
        
    it('should handle errors when fetching schedules', async () => {
        const errorMessage = 'Error fetching schedules';
        (Schedule_DB.find as jest.Mock).mockRejectedValue(new Error(errorMessage)); 
        await expect(post.get_services()).rejects.toThrow(errorMessage);
      });
  });

describe('Schedule Service - get_data', () => {

  it('should return schedules based on query', async () => {
    
    const mockPopulate = jest.fn().mockResolvedValue([
        {
            participants: [{  name: 'John Doe' }]
        }
    ]);

    const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });  
    (Schedule_DB.find as jest.Mock).mockImplementation(mockFind);

     await post.get_services();
});
});

describe('Schedule Delete Service - get_data', () => {
  it('should successfully delete a schedule by id', async () => {
    const mockId = '6123abcd1234567890123456';
    const mockDeletedSchedule = { _id: mockId};  
    (Schedule_DB.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedSchedule);
    let result =  await post.delete_services(mockId);
   expect(Schedule_DB.findByIdAndDelete).toHaveBeenCalledTimes(1); 
    expect(Schedule_DB.findByIdAndDelete).toHaveBeenCalledWith({ _id: mockId });
    expect(result).toEqual(mockDeletedSchedule);
  });
});

describe('Update Schedule' , () => {
  it('should successfully update a schedule by id', async () => {
    const mockId = '123456789';
    const mockBody = { type: 'Interview' };
    const mockUpdatedSchedule = { _id: mockId, type: 'Interview' };
    
    (Schedule_DB.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedSchedule);

    const result = await post.update_services(mockId, mockBody);

    expect(Schedule_DB.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: mockId },
      { $set: mockBody },
      { new: true, runValidators: true }
    );
    expect(result).toEqual(mockUpdatedSchedule);
});
});

describe('post_services', () => {
  let mockBody: any;

  beforeEach(() => {
    mockBody = {
      start_time: '10-10-24 14:30',
      end_time: '10-10-24 15:30',
      name: 'New Schedule',
    };
  });

  it('should successfully post a schedule with valid dates', async () => {
    const mockParsedStartTime = new Date(2024, 9, 10, 14, 30); 
    const mockParsedEndTime = new Date(2024, 9, 10, 15, 30);  
    const mockSavedSchedule = { ...mockBody};

    // Mock parse to return valid dates
    (parse as jest.Mock)
      .mockReturnValueOnce(mockParsedStartTime)
      .mockReturnValueOnce(mockParsedEndTime);

    (isValid as jest.Mock).mockReturnValue(true);
    (Schedule_DB.prototype.save as jest.Mock).mockResolvedValue(mockSavedSchedule);

    const result = await post.post_services(mockBody);

    expect(parse).toHaveBeenCalledWith(mockBody.start_time, 'dd-MM-yy HH:mm', expect.any(Date));
    expect(parse).toHaveBeenCalledWith(mockBody.end_time, 'dd-MM-yy HH:mm', expect.any(Date));
    expect(isValid).toHaveBeenCalledTimes(2); 
    expect(Schedule_DB).toHaveBeenCalledWith({
      ...mockBody,
      start_time: mockParsedStartTime,
      end_time: mockParsedEndTime,
    });
    expect(result).toEqual(mockSavedSchedule);
  });

});


