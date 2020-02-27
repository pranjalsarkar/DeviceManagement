import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Lookup, Device, Employee } from "src/app/Resource/Models";
import { Employees } from "src/app/Resource/MockData";
import { DeviceService } from "src/app/device.service";
import { DeviceFacadeService } from "../../Core/device-facade.service";

@Component({
  selector: "app-assign-employees",
  templateUrl: "./assign-employees.component.html",
  styleUrls: ["./assign-employees.component.less"]
})
export class AssignEmployeesComponent implements OnInit {
  selectedDevice: Device;
  Employees: Employee[];

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private deviceFacade: DeviceFacadeService
  ) {}

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["Login"]);
      return;
    }

    this.deviceService.getEmployees().subscribe(t => (this.Employees = t));
    let serialNo = this.activeRoute.snapshot.paramMap.get("device");

    this.deviceFacade.getDevices().subscribe(t => {
      this.selectedDevice = t.filter(m => m.serialNo == serialNo)[0];
    });
  }

  onCancel() {
    this.router.navigate(["Search"]);
  }
}
