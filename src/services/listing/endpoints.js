import axios from "axios";
import api from "../api";

const baseAPI = import.meta.env.VITE_API_ENDPOINT;

export const uploadListing = async (formData) => {
  try {
    const response = await api.post("/api/listing/upload", formData, {
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

export const getListings = async () => {
  try {
    const response = await api.get("/api/listing/");
    return response.data;
  } catch (error) {
    console.error("Get Listing error", error.response);
    throw error;
  }
};

export const deleteListings = async (id) => {
  try {
    const response = await api.delete(`/api/listing/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Get Listing error", error.response);
    throw error;
  }
};

