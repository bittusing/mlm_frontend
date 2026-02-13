// API Configuration
// Vercel automatically uses .env.production in production builds
export const API_URL = process.env.REACT_APP_API_URL || 'https://mlm-backend-git-main-abhilekh-singhs-projects.vercel.app/api';

// Helper function to get auth headers
export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

// Helper function to get config with auth
export const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default API_URL;
