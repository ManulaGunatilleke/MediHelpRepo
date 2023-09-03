import axios from "axios";

const HOST = "http://localhost:8070/Transport";

export const getAllTransport = async () => {
  try {
    const response = await axios.get(`${HOST}/allTransport`);
    return response;
  } catch (error) {
    console.log("Error while retrieving data", error);
    return false;
  }
};
