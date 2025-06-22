import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-traveltales.onrender.com/api',
  withCredentials: true, // Include cookies in requests
  
});
console.log(import.meta.env.VITE_API_URL); 
export default axiosInstance;