import axios from "axios";

const baseAPI = import.meta.env.VITE_API_ENDPOINT;


export const  confirmOTP = async (otp, email) => {
  try {
    const response = await axios.post(`${baseAPI}/api/auth/confirm-otp`, { otp, email }); 
    return response.data;
  } catch (error) {
    console.error("Error confirming OTP:", error);
    throw error; 
  } 
}

export const  resendOTP = async (email) => {
  try {
    const response = await axios.post(`${baseAPI}/api/auth/resend-otp`, { email }); 
    return response.data;
  } catch (error) {
    console.error("Error resending OTP:", error.response);
    throw error; 
  } 
}

export const  logInUser = async (email, password) => {
  try {
    const response = await axios.post(`${baseAPI}/api/auth/log-in`, { email, password });
    return response.data; 
  } catch (error) {
    console.error("log in error", error.response);
    throw error; 
  } 
}

export const  forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${baseAPI}/api/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("forgot password error", error.response);
    throw error; 
  }
}

export const  resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${baseAPI}/api/auth/reset-password`, { email, password });
    return response.data;
  } catch (error) {
    console.error("reset password error", error);
    throw error; 
  }
}
