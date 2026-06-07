import axios from "axios";
import api from "../api";

const baseAPI = import.meta.env.VITE_API_ENDPOINT;

export const uploadListing = async (formData) => {
  try {
    const response = await api.post("/api/upload-listing", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Listing error", error.response);
    throw error;
  }
};
