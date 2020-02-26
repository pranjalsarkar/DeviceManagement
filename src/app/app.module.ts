import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient
} from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";
import { Guid } from "guid-typescript";

import { JWTTokenInterceptor } from "./Core/JWTTokenInterceptor";
import { AppRoutingModule } from "./app-routing.module";
import { DeviceService } from "./device.service";
import { DeviceFacadeService } from "./Core/device-facade.service";
import { DeviceStateService } from "./Core/device-state.service";
import { AppComponent } from "./app.component";
import { AddDeviceComponent } from "./Device/add-device/add-device.component";
import { SearchDeviceComponent } from "./Device/search-device/search-device.component";
import { DeviceCardComponent } from "./Device/device-card/device-card.component";
import { AssignEmployeesComponent } from "./Device/assign-employees/assign-employees.component";
import { EditDeviceComponent } from "./Device/edit-device/edit-device.component";
import { LoginComponent } from "./Login/login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    AddDeviceComponent,
    SearchDeviceComponent,
    DeviceCardComponent,
    AssignEmployeesComponent,
    EditDeviceComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DeviceService,
    DeviceFacadeService,
    DeviceStateService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JWTTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
