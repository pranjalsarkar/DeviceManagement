import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddDeviceComponent } from "./Device/add-device/add-device.component";
import { SearchDeviceComponent } from "./Device/search-device/search-device.component";
import { DeviceCardComponent } from "./Device/device-card/device-card.component";
import { AssignEmployeesComponent } from "./Device/assign-employees/assign-employees.component";
import { EditDeviceComponent } from "./Device/edit-device/edit-device.component";
import { LoginComponent } from "./Login/login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "Add", component: AddDeviceComponent },
  { path: "Search", component: SearchDeviceComponent },
  { path: "Card", component: DeviceCardComponent },
  { path: "Assign/:device", component: AssignEmployeesComponent },
  { path: "Edit/:device", component: EditDeviceComponent },
  { path: "Login", component: LoginComponent },
  {
    path: "AssignEmployee/:device",
    loadChildren: () =>
      import("./employee/employee.module").then(m => m.EmployeeModule)
  },
  { path: "", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
