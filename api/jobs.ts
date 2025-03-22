import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://empllo.com/api/v1';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    const jobsWithIds = response.data.map((job) => ({
      ...job,
      id: uuidv4(), // Assign a unique ID to each job
    }));
    return jobsWithIds;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};