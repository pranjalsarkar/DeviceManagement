import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Device, Employee, Lookup, ApiResponse } from "./Resource/Models";
import { Devices, Employees, DeviceTypeLookup } from "./Resource/MockData";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  //login api
  login(loginPayload): Observable<ApiResponse> {
    //Web API call to authenticate user

    //return this.http.post<ApiResponse>(
    //  "https://localhost:5001/api/nguser/AuthenticateUser",
    //  loginPayload
    // );

    let valid: boolean = false;

    if (loginPayload.username == "admin" && loginPayload.password == "admin") {
      valid = true;
    }
    let apiResponse = new ApiResponse();
    apiResponse.message = "Token created successfully";
    apiResponse.status = 200;

    if (valid) {
      apiResponse.result = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNTgyNzgxMzM3LCJleHAiOjE1ODMzODYxMzcsImlhdCI6MTU4Mjc4MTMzN30.7gOH91XBiFiHp-Y8AwfLqiYRTGDmTooSMtqVfBFKSW0"
      };
    } else {
      apiResponse.result = {
        token: ""
      };
    }

    return of(apiResponse);
  }

  getDevices(): Observable<Device[]> {
    return of(Devices); //call to local static json data

    //call to actual web api returning static json
    //return this.http.get<Device[]>("https://localhost:5001/api/Device");
  }

  //not used
  searchDevices(searchText: string): Observable<Device[]> {
    //This could be implemented with httpclient module and request API to search based on searchtext and return the filtered value
    //return of(null);
    const searchPayload = {
      searchText: searchText,
      searchDate: new Date()
    };
    return this.http.post<Device[]>(
      "https://localhost:5001/api/Device/SearchDevice",
      searchPayload
    );
  }

  getDeviceTypes(): Observable<Lookup[]> {
    return of(DeviceTypeLookup);
  }

  addDevice(mdl: Device): void {
    //Todo: call REST Api using HttpClient to update database

    Devices.push(mdl);
    //console.log(Devices);
  }

  editDevice(mdl: Device): void {
    for (let t: number = 0; t < Devices.length; t++) {
      if (Devices[t].serialNo == mdl.serialNo) {
        Devices[t].name = mdl.name;
        Devices[t].type = mdl.type;
      }
    }
  }

  getEmployees(): Observable<Employee[]> {
    return of(Employees);
  }
}
