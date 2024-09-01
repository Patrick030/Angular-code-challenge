import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleInfoFormComponent } from './features/vehicle-info-form/vehicle-info-form.component';
import { VehicleImageComponent } from './features/vehicle-info-form/components/vehicle-image/vehicle-image.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleInfoFormComponent,
    VehicleImageComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
