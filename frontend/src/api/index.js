import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJobs = () => api.get('/jobs');
export const getTrends = () => api.get('/trends');
export const matchResume = (resumeText) => api.post('/match-resume', { resume_text: resumeText });

export default api;
