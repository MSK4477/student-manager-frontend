import axios from "axios";

const BASE_URL = "https://student-manager-backend-3.onrender.com";

// Register
export const register = async (newUser) => {
  const response = await axios.post(
    `${BASE_URL}/user/register`,
    newUser,
    { withCredentials: true }
  );
  return response.data;
};

// Login
export const login = async (user) => {
  const response = await axios.post(
    `${BASE_URL}/user/login`,
    user,
    { withCredentials: true }
  );
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axios.get(
    `${BASE_URL}/user/logout`,
    { withCredentials: true }
  );
  return response.data;
};

// Email Verification
export const verify = async (token) => {
  const response = await axios.get(
    `${BASE_URL}/user/verify?token=${token}`,
    { withCredentials: true }
  );
  return response.data;
};

// Forgot Password
export const forgotpassword = async (email) => {
  const response = await axios.post(
    `${BASE_URL}/user/forgotPassword`,
    email,
    { withCredentials: true }
  );
  return response.data;
};

// Reset Password
export const resetpassword = async (token, formData) => {
  const response = await axios.post(
    `${BASE_URL}/user/resetPassword?token=${token}`,
    formData,
    { withCredentials: true }
  );
  return response.data;
};

// Get User
export const getUser = async () => {
  const response = await axios.get(
    `${BASE_URL}/user`,
    { withCredentials: true }
  );
  return response.data;
};

// Update User
export const updateUser = async (id, formData) => {
  const response = await axios.put(
    `${BASE_URL}/user/update/${id}`,
    formData,
    { withCredentials: true }
  );
  return response.data;
};

// Delete User
export const deleteUser = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/user/delete/${id}`,
    { withCredentials: true }
  );
  return response.data;
};
