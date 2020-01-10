// Fetched on starting the device
// ? the api endpoints all use the query parameters for fetching
// ? create a first screen display for registering the device
// ib scanner
// make the clock in/clock out buttons obvious for UX

// employee data mock
export const employeeData = [
  {
    employeeid: "employeeid",
    fname: "fname",
    mname: "mname",
    lname: "lname",
    email: "email",
    address: "address",
    country: "country",
    state: "state",
    gender: "gender",
    phone: "phone",
    nextofkin: "nextofkin",
    dofb: "dofb",
    employmenttype: "employmenttype",
    location1: "location1",
    department1: "department1",
    workshift1: "workshift1",
    uname: "uname",
    pword: "pword",
    status: "status",
    createdby: "createdby",
    profilepic: "profilepic",
    finger1: "finger1",
    finger2: "finger2",
    finger3: "finger3",
    finger4: "finger4",
    finger5: "finger5",
    finger6: "finger6",
    finger7: "finger7",
    finger8: "finger8",
    finger9: "finger9",
    finger10: "finger10"
  }
];

// admin data
export const adminData = {
  adminid: "adminid",
  deviceid: "deviceid",
  location: "location",
  uname: "uname",
  pword: "pword",
  status: "status"
};

// Sent when device settings changes and sending reports for the day even when offline/online
// device data
export const deviceData = {
  deviceid: "deviceid",
  devicename: "devicename",
  serialno: "serialno",
  location: "location",
  gpslocation: "lng.lat",
  admin: "admin" //suggest to add to get the admin username/id doing the changes
};

// attendance data
export const attendanceData = [
  {
    date: "date",
    month: "month",
    year: "year",
    employeeid: "employeeid",
    timeIn: "timeIn",
    timeInseconds: "timeInseconds",
    timeOut: "timeOut",
    timeOutseconds: "timeOutseconds",
    totaltime: "totaltime",
    totaltimeseconds: "totaltimeseconds",
    deviceid: "deviceid",
    location: "location",
    employeedept: "employeedept",
    attendance: "attendance"
  }
];

// places
export const places = [
  {
    label: "Oshodi"
  },
  {
    label: "Amuwo"
  },
  {
    label: "Headquarters"
  },
  {
    label: "Field PH"
  },
  {
    label: "Apapa"
  },
  {
    label: "Okokomaika Site"
  },
  {
    label: "Agege Field"
  },
  {
    label: "Abuja, Kuje"
  },
  {
    label: "Festac Town"
  },
  {
    label: "Satellite"
  }
];
