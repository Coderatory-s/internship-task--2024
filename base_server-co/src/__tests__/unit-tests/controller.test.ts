import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import teamController from '../../APIs/HR/team/controller';  // Import the controller
import Team from '../../APIs/HR/_shared/models/teamModel';  // Import the Team model

// Create an instance of an Express app for testing
const app = express();
app.use(express.json());

// Middleware to simulate Express error handling
app.post('/team', (req: Request, res: Response, next: NextFunction) => {
  teamController.createTeam(req, res, next);
});

describe('Team Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();  // Clear any mocks after each test
  });

  // Test for creating a new team
  it('should create a new team successfully', async () => {
    // Mock the save method of the Team instance
    const saveMock = jest.spyOn(Team.prototype, 'save')
      .mockResolvedValueOnce({
        name: 'Test Team',
        description: 'Test description',
        members: ['Member1', 'Member2']
      });

    const mockTeam = {
      name: 'Test Team',
      description: 'Test description',
      members: ['Member1', 'Member2']
    };

    // Send a POST request to the endpoint
    const response = await request(app)
      .post('/team')
      .send(mockTeam);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Team created successfully');
    expect(response.body.team.name).toBe(mockTeam.name);
    expect(response.body.team.description).toBe(mockTeam.description);
    expect(response.body.team.members).toEqual(mockTeam.members);
    
    expect(saveMock).toHaveBeenCalledTimes(1);  // Check that save was called
  });

  // Test for handling errors
  it('should handle errors if something goes wrong', async () => {
    // Mock the save method to throw an error
    const saveMock = jest.spyOn(Team.prototype, 'save')
      .mockRejectedValueOnce(new Error('Database Error'));

    const mockTeam = {
      name: 'Test Team',
      description: 'Test description',
      members: ['Member1', 'Member2']
    };

    // Send a POST request and expect an error
    const response = await request(app)
      .post('/team')
      .send(mockTeam);

    // Assertions for error handling
    expect(response.status).toBe(500);  // Server error status
    expect(response.body.message).toBe('Internal Server Error');
    
    expect(saveMock).toHaveBeenCalledTimes(1);  // Check that save was called
  });
});
