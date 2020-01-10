import { axiosInstance as axios } from "../config/axios";

export default async function updateAttendance(attendance) {
  try {
    const { data } = await axios.post("/update_attendance", attendance);

    return data;
  } catch (error) {
    console.error(error);
  }
}
