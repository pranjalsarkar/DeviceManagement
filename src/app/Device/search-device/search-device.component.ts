import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DeviceService } from "../../device.service";
import { DeviceFacadeService } from "../../Core/device-facade.service";

import { Device } from "../../Resource/Models";
import { Devices } from "../../Resource/MockData";
import { Observable } from "rxjs";

import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from "rxjs/operators";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-search-device",
  templateUrl: "./search-device.component.html",
  styleUrls: ["./search-device.component.less"]
})
export class SearchDeviceComponent implements OnInit {
  isUpdating$: Observable<boolean>;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private deviceFacade: DeviceFacadeService,
    private toastr: ToastrService
  ) {
    this.isUpdating$ = deviceFacade.isUpdating();
  }

  searchTriggered = false;
  searchText: string = "";
  searchResult: Device[];

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["Login"]);
      return;
    }
    //console.log(this.searchResult);
    this.deviceFacade.loadDevices(); //Load devices to current state

    //load saved search
    this.deviceFacade.getSearchedDevice().subscribe(t => {
      this.searchResult = t;
    });

    //Type ahead sample
    /*const searchBox = document.getElementById("search-box");

    const typeahead = fromEvent(searchBox, "input").pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(() => this.deviceFacade.getDevices())
    );

    typeahead.subscribe(data => {
      console.log(data);
    });*/
  }

  searchDevices() {
    this.searchTriggered = true;

    if (this.searchText !== "") {
      this.deviceFacade.getDevices().subscribe(
        t => {
          this.searchResult = t.filter(
            m =>
              m.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              m.type.toLowerCase().includes(this.searchText.toLowerCase())
          );
        },
        err => {
          this.toastr.error(
            "Unexpected error while fetching device",
            "Search Device"
          );
        }
      );
    } else {
      this.searchResult = [];
    }

    this.deviceFacade.setSearchedDevice(this.searchResult); //save the search result state

    console.log("search-device", this.searchResult);
  }

  addDevice() {
    this.searchTriggered = false;
    this.router.navigate(["Add"]);
  }
}
