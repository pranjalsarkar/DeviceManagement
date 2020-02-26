import { Injectable } from "@angular/core";

import { DeviceService } from "../device.service";
import { DeviceStateService } from "./device-state.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Device } from "../Resource/Models";

@Injectable({
  providedIn: "root"
})
export class DeviceFacadeService {
  constructor(
    private deviceService: DeviceService,
    private deviceState: DeviceStateService
  ) {}

  isUpdating(): Observable<boolean> {
    return this.deviceState._isUpdating();
  }

  getDevices(): Observable<Device[]> {
    return this.deviceState._getDevices();
  }

  loadDevices() {
    //alert("hi");
    return this.deviceService.getDevices().subscribe(dv => {
      this.deviceState._setDevice(dv);
    });
  }

  addDevice(dv: Device) {
    //update starts
    this.deviceState._setUpdating(true);
    //API service call to add
    this.deviceService.addDevice(dv);
    //Update state after API call
    this.deviceState._addDevice(dv);
    //update ends
    this.deviceState._setUpdating(false);
  }

  updateDevice(dv: Device) {
    this.deviceState._setUpdating(true);
    this.deviceService.editDevice(dv); //api service call
    this.deviceState._updateDevice(dv);
    this.deviceState._setUpdating(false);
  }

  //search state

  getSearchedDevice(): Observable<Device[]> {
    return this.deviceState._getSearchedDevice();
  }

  setSearchedDevice(dv: Device[]) {
    this.deviceState._setSearchedDevice(dv);
  }
}
