import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DeviceService } from "../../device.service";
import { DeviceFacadeService } from "../../Core/device-facade.service";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: DeviceService,
    private toastr: ToastrService,
    private deviceFacade: DeviceFacadeService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.isLoading = true;
    this.apiService.login(loginPayload).subscribe(
      data => {
        //debugger;
        if (data.status === 200 && data.result.token !== "") {
          window.localStorage.setItem("token", data.result.token);
          //this.deviceFacade.loadDevices(); //Loads all devices to current state
          this.router.navigate(["Search"]);
        } else {
          this.isLoading = false;
          this.invalidLogin = true;
          //alert(data.message);
        }
      },
      err => {
        this.isLoading = false;
        this.toastr.error("Unexpected error while logging in", "Login");
      }
    );
  }

  ngOnInit() {
    window.localStorage.removeItem("token");
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
}
