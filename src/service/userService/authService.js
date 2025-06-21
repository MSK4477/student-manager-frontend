import axios from "axios";


export const register = async (newUser) => {
  const response = await axios.post(
    "https://inventory-billing-backend-l6kc.onrender.com/user/register",
    newUser,{
      withCredentials: true,
    }
  );

  return response.data;
};
 export const login = async (user) => {
    const response = await axios.post(
      "https://inventory-billing-backend-l6kc.onrender.com/user/login",
        user,{
          withCredentials: true,
        }
    );
    return response.data;
 }
 export const logout = async() => {
  const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/user/logout`, {
    withCredentials: true,
  });
  return response.data;

 }
 export const verify = async (token) => {
  const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/user/verify?token=${token}`, {
    withCredentials: true,
  });
  return response.data;
 }

 export const forgotpassword  = async (email) => {

  const response = await axios.post(`https://inventory-billing-backend-l6kc.onrender.com/user/forgotPassword`,email,{
    withCredentials: true,
  })
  return response.data
 } 
 export const resetpassword  = async (token, formData) => {

  const response = await axios.post(`https://inventory-billing-backend-l6kc.onrender.com/user/resetPassword?token=${token}`,formData,{
    withCredentials: true,
  })
  return response.data
 }

 //get User 
  export const getUser = async () => {
    const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/user`, {
      withCredentials: true,
    });
    return response.data;
  }

  //update User 
  export const updateUser = async (id, formData) => {
    const response = await axios.post(`https://inventory-billing-backend-l6kc.onrender.com/user/update/${id}`, formData, {
      withCredentials: true,
    });
    return response.data;
  }

  //delete User 
  export const deleteUser = async (id) => {
    const response = await axios.get(`https://inventory-billing-backend-l6kc.onrender.com/user/delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }