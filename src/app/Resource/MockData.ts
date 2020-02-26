import { Device, Employee, Lookup, AssignedDevice } from "./Models";

export const Devices: Device[] = [
  {
    serialNo: "8f67699f-66af-1647-6ded-8528a675008e",
    name: "Laptop",
    type: "Computer"
  },
  {
    serialNo: "c765fedb-6730-b53b-d609-a32665e93412",
    name: "Desktop",
    type: "Computer"
  },
  {
    serialNo: "96c71fed-08c2-e2cf-7a55-94dcc8615a9c",
    name: "Tablet",
    type: "Computer"
  }
];

export const Employees: Employee[] = [
  {
    empNo: "100",
    empName: "John Doe",
    jobTitle: "consultant",
    isSelected: false
  },
  {
    empNo: "101",
    empName: "Jimmy Doe",
    jobTitle: "consultant",
    isSelected: false
  },
  {
    empNo: "102",
    empName: "Peter Parker",
    jobTitle: "consultant",
    isSelected: false
  },
  {
    empNo: "103",
    empName: "Mark Brown",
    jobTitle: "Administrative Assistant",
    isSelected: false
  },
  {
    empNo: "104",
    empName: "Jeff Miller",
    jobTitle: "Financial Analyst III",
    isSelected: false
  }
];

export const DeviceTypeLookup: Lookup[] = [
  { id: "Internet", value: "Internet" },
  { id: "Network", value: "Network" },
  { id: "Accessories", value: "Accessories" },
  { id: "Computer", value: "Computer" }
];

export const assignedDevices: AssignedDevice[] = [];
