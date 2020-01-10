import { axiosInstance as axios } from "../config/axios";

export default async function getEmployeeDetails() {
  try {
    const { data } = await axios.post(`?get_employee=0&location=1`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
