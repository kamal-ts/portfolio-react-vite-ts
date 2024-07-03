const API_BASE_URL = "https://my-portfolio-backend-express.vercel.app/api";
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const API_USER_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users`,
  GET_USER_CURRENT: `${API_BASE_URL}/users/current`,
};

export const API_MYPROJECT_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/myprojects`,
};
  