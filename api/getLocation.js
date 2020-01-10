import { axiosInstance as axios } from "../config/axios";

export default async function getLocation() {
  try {
    const { data } = await axios.get("?get_location=0");
    return data;
  } catch (error) {
    console.error(error);
  }
}
