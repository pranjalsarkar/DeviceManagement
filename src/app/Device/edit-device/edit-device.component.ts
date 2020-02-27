import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Lookup, Device } from "src/app/Resource/Models";
import { DeviceService } from "src/app/device.service";
import { DeviceFacadeService } from "../../Core/device-facade.service";

@Component({
  selector: "app-edit-device",
  templateUrl: "./edit-device.component.html",
  styleUrls: ["./edit-device.component.less"]
})
export class EditDeviceComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private deviceService: DeviceService,
    private deviceFacade: DeviceFacadeService
  ) {}

  addForm: FormGroup;
  submitted = false;
  deviceLookup: Lookup[];
  selectedDevice: Device;

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["Login"]);
      return;
    }

    let serialNo = this.activeRoute.snapshot.paramMap.get("device");

    this.deviceFacade.getDevices().subscribe(t => {
      if (t === null) {
        this.toastr.error("Error fetching device", "Edit Device");
        this.router.navigate(["Search"]);
      }

      this.selectedDevice = t.filter(m => m.serialNo == serialNo)[0];

      this.addForm = this.formBuilder.group({
        serialno: [this.selectedDevice.serialNo],
        name: [
          this.selectedDevice.name,
          [Validators.required, Validators.maxLength(50)]
        ],
        type: [this.selectedDevice.type, Validators.required]
      });
    });

    this.deviceService.getDeviceTypes().subscribe(t => (this.deviceLookup = t));
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      this.submitted = false;
      return;
    }

    let dv: Device = {
      serialNo: this.addForm.value.serialno,
      name: this.addForm.value.name,
      type: this.addForm.value.type
    };

    //console.log(dv);
    this.deviceFacade.updateDevice(dv);
    this.submitted = false;

    this.toastr.success("Device updated successfully", "Edit Device");

    this.router.navigate(["Search"]);
  }

  onCancel() {
    this.submitted = false;
    this.router.navigate(["Search"]);
  }
}
