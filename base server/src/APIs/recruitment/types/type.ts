// src/types/types.ts
// Assuming this is your candidate interface
import { JwtPayload } from 'jsonwebtoken';

// Define the interface for the job post
export interface IJobPost {
  jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

// Define the interface for the decoded JWT payload
export interface IDecryptedJwt extends JwtPayload {
    jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  
    // Add any additional properties expected in the token
}
// Extend Request to include authenticatedUser
export interface IAuthenticateRequest extends Request {
    authenticatedUser?: IDecryptedJwt; // Make sure this is compatible with your middleware
  }