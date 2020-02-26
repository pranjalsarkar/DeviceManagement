export class Device {
  serialNo: string;
  name: string;
  type: string;
}

export class Employee {
  empNo: string;
  empName: string;
  jobTitle: string;
  isSelected: boolean;
}

export class AssignedDevice {
  serialNo: string;
  empNo: string[];
}

export class Lookup {
  id: string;
  value: string;
}

export class ApiResponse {
  status: number;
  message: string;
  result: any;
}
