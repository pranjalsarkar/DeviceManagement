import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Device } from "../Resource/Models";

@Injectable({
  providedIn: "root"
})
export class DeviceStateService {
  private updating_ = new BehaviorSubject<boolean>(false);
  private Devices_ = new BehaviorSubject<Device[]>(null);
  private searchedDevices_ = new BehaviorSubject<Device[]>(null);

  constructor() {}

  _isUpdating() {
    return this.updating_.asObservable();
  }

  _setUpdating(isUpdating: boolean) {
    this.updating_.next(isUpdating);
  }

  _getDevices() {
    return this.Devices_.asObservable();
  }

  _setDevice(devices: Device[]) {
    //alert("h-i");
    this.Devices_.next(devices);
  }

  _addDevice(device: Device) {
    const currentValue = this.Devices_.getValue();
    this.Devices_.next([...currentValue, device]); //Merges new added device into current list
  }

  _updateDevice(device: Device) {
    const devices = this.Devices_.getValue();
    const indexOfUpdated = devices.findIndex(
      dv => dv.serialNo === device.serialNo
    );
    devices[indexOfUpdated] = device;
    this.Devices_.next([...devices]);
  }

  //search state management
  _setSearchedDevice(dv: Device[]) {
    this.searchedDevices_.next(dv);
  }

  _getSearchedDevice() {
    return this.searchedDevices_.asObservable();
  }
}
