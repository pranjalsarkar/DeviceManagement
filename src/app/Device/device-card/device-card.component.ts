import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-device-card",
  templateUrl: "./device-card.component.html",
  styleUrls: ["./device-card.component.less"]
})
export class DeviceCardComponent implements OnInit {
  @Input() serialNo: string;
  @Input() deviceName: string;
  @Input() deviceType: string;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["Login"]);
      return;
    }
  }

  editDevice(serNo: string) {
    this.router.navigate(["/Edit", serNo]);
  }

  assignDevice(serNo: string) {
    this.router.navigate(["/AssignEmployee", serNo]);
  }
}
