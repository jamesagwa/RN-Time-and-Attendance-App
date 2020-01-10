import { axiosInstance as axios } from "../config/axios";

export default async function updateDevice(device) {
  const deviceData = {
    deviceid: device.id,
    devicename: device.name,
    serialno: device.serial,
    location: device.location,
    gpslocation: device.gpsLocation,
    admin: device.admin //suggest to add to get the admin username/id doing the changes
  };

  console.log(deviceData);

  try {
    const { data } = await axios.post(`/update_device`, deviceData);
    return data;
  } catch (error) {
    console.error(error);
  }
}
