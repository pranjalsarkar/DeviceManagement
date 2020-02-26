import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule, FormGroup } from "@angular/forms";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

import {
  Lookup,
  Device,
  Employee,
  AssignedDevice
} from "src/app/Resource/Models";
import { Employees, assignedDevices } from "src/app/Resource/MockData";
import { DeviceService } from "src/app/device.service";
import { DeviceFacadeService } from "../Core/device-facade.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.less"]
})
export class EmployeeComponent implements OnInit {
  assignForm: FormGroup;
  selectedDevice: Device = null;
  Employees: Employee[];
  serialNo: string = "";

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private deviceFacade: DeviceFacadeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.deviceService.getEmployees().subscribe(t => (this.Employees = t));
    this.serialNo = this.activeRoute.snapshot.paramMap.get("device");

    this.deviceFacade.getDevices().subscribe(t => {
      if (t === null) {
        this.toastr.error("Error fetching device", "Assign Device");
        this.router.navigate(["Search"]);
      }
      try {
        this.selectedDevice = t.filter(m => m.serialNo == this.serialNo)[0];
      } catch (error) {}

      this.Employees.forEach(t => (t.isSelected = false)); //reset selected flag
      //console.log("emp-oninit", this.Employees);
      //console.log("oninit", assignedDevices);
      if (assignedDevices.length >= 0) {
        let indx: number = -1;
        indx = assignedDevices.findIndex(t => t.serialNo == this.serialNo);
        //console.log("oninit_indx", indx);
        if (indx >= 0) {
          for (let a = 0; a < this.Employees.length; a++) {
            for (let b = 0; b < assignedDevices[indx].empNo.length; b++) {
              if (this.Employees[a].empNo == assignedDevices[indx].empNo[b]) {
                this.Employees[a].isSelected = true;
                // console.log("sel-emp", this.Employees[a].empNo);
                break;
              }
            }
          }
        }
      }
    });
  }

  onSelChanged(event) {}

  onCancel() {
    this.router.navigate(["Search"]);
  }

  assignEmployees() {
    console.log("AD0", assignedDevices);

    try {
      let indx: number = -1;

      indx = assignedDevices.findIndex(t => t.serialNo == this.serialNo);
      if (indx >= 0) {
        assignedDevices[indx].empNo = [];
      } else {
        let ad = new AssignedDevice();
        ad.serialNo = this.serialNo;
        ad.empNo = [];
        indx = assignedDevices.push(ad);
        indx--;
      }

      this.Employees.forEach(t => {
        if (t.isSelected) {
          assignedDevices[indx].empNo.push(t.empNo);
        }
      });

      if (assignedDevices[indx].empNo.length <= 0) {
        this.toastr.error("No employee is selected", "Assign Device");
        return;
      }

      this.toastr.success("Device assigned successfully", "Assign Device");
      this.router.navigate(["Search"]);

      console.log("AD3", assignedDevices);
    } catch (error) {
      this.toastr.error("Error assigning device", "Assign Device");
    }
  }
}
