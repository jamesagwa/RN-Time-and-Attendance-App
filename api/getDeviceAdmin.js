import { axiosInstance as axios } from "../config/axios";

export default async function getDeviceAdmin() {
  try {
    const { data } = await axios.post(
      `?get_deviceadmin=1&location=locationid&deviceid=deviceid`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
