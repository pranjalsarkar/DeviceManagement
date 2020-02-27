import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { Guid } from "guid-typescript";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Lookup, Device } from "src/app/Resource/Models";
import { DeviceService } from "src/app/device.service";
import { DeviceFacadeService } from "../../Core/device-facade.service";

import { observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.less"]
})
export class AddDeviceComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private deviceService: DeviceService,
    private deviceFacade: DeviceFacadeService
  ) {}

  addForm: FormGroup;
  submitted = false;
  deviceLookup: Lookup[];

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["Login"]);
      return;
    }

    this.addForm = this.formBuilder.group({
      serialno: [
        Guid.create().toString(),
        [Validators.required, Validators.maxLength(40)]
      ],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      type: ["", Validators.required]
    });

    this.deviceService.getDeviceTypes().subscribe(t => (this.deviceLookup = t));
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    let dv: Device = {
      serialNo: this.addForm.value.serialno,
      name: this.addForm.value.name,
      type: this.addForm.value.type
    };

    let indx: number = -1;
    //console.log(dv);
    this.deviceFacade
      .getDevices()
      .subscribe(t => {
        if (t !== null) {
          indx = t.findIndex(m => m.serialNo == dv.serialNo);
        } else {
          this.toastr.error("Error fetching devices", "Add Device");
          this.router.navigate(["Search"]);
        }
      })
      .unsubscribe();

    //alert(indx);
    if (indx >= 0) {
      this.toastr.error("Duplicate serial no. ", "Add Device");
    } else {
      this.deviceFacade.addDevice(dv);
      this.submitted = false;
      this.toastr.success("Device added successfully", "Add Device");
      this.router.navigate(["Search"]);
    }
  }

  onCancel() {
    this.submitted = false;
    this.router.navigate(["Search"]);
  }
}
