/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import { JobPost } from '../model/Candidate'; // Adjust the import path if necessary

// POST request to create a new job post
export const createJobPost = async (req: Request, res: Response) => {
  try {
    const { jobTitle, department, jobType, location, description, startDate, endDate } = req.body;

    // Check for missing fields
    if (!jobTitle || !department || !jobType || !location || !description || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new JobPost object
    const jobPost = new JobPost({
      jobTitle,
      department,
      jobType,
      location,
      description,
      startDate,
      endDate,
    });

    // Save the job post to the database
    const savedJobPost = await jobPost.save();
    return res.status(201).json(savedJobPost); // Respond with the created job post
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred.', error });
  }
};

// GET request to fetch all job posts
export const getJobPosts = async (_req: Request, res: Response) => {
  try {
    // Fetch all job posts from the database
    const jobPosts = await JobPost.find(); // This assumes JobPost is a Mongoose model

    // Check if job posts exist
    if (!jobPosts || jobPosts.length === 0) {
      return res.status(404).json({ message: 'No job posts found.' });
    }

    // Return the list of job posts
    return res.status(200).json(jobPosts);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching job posts.', error });
  }
};
