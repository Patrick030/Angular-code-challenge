import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleSubtype, VehicleType } from '../../core/enums/vehicle.enum';
import { KentekenCheck } from 'rdw-kenteken-check';
import { LicenseCheckHelper } from '../../core/helper/license-check.helper';

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss'],
})
export class VehicleInfoFormComponent implements OnInit {
  public showLicenseError = false;
  public invalidFormSubmit = false;
  public vehicle: string = VehicleType.car;
  public vehicleForm: FormGroup  = new FormGroup({});
  public VehicleTypeEnum = VehicleType;
  public vehicleTypes: VehicleType[] = [
    VehicleType.car,
    VehicleType.motorcycle,
    VehicleType.scooter,
  ];

  private carSubTypes: VehicleSubtype[] = [
    VehicleSubtype.hatchback,
    VehicleSubtype.sedan,
    VehicleSubtype.station,
    VehicleSubtype.cabriolet,
    VehicleSubtype.coupe,
    VehicleSubtype.SUV,
    VehicleSubtype.terrain,
  ];

  private motorcycleSubTypes: VehicleSubtype[] = [
    VehicleSubtype.allRoad,
    VehicleSubtype.naked,
    VehicleSubtype.enduro,
    VehicleSubtype.race,
    VehicleSubtype.tourMotor,
    VehicleSubtype.chopper,
    VehicleSubtype.sidecar,
  ]

  public vehicleSubTypes: VehicleSubtype[] = this.carSubTypes;

  constructor(private fb: FormBuilder){}

  public ngOnInit(): void {
    this.createForm();
    this.onTypeChange();
  }

  public createForm(): void {
    this.vehicleForm = this.fb.group({
      type: [VehicleType.car, Validators.required],
      subtype: ['', Validators.required],
      license: ['', Validators.required],
    });
  }

  public onTypeChange(): void {
    this.vehicleForm.get('type')?.valueChanges.subscribe((selectedVehicleType: string) => {
      this.vehicle = selectedVehicleType;
      this.vehicleSubTypes = selectedVehicleType === VehicleType.car ? this.carSubTypes : this.motorcycleSubTypes;

      this.updateValidation(selectedVehicleType);
    });
  }

  public submit(): void {
    this.vehicleForm.markAllAsTouched();
    this.vehicleForm.updateValueAndValidity();

    if (this.vehicleForm.valid) {
      this.invalidFormSubmit = false;
      alert('submitted');
    } else {
      this.invalidFormSubmit = true;
    }
  }

  private updateValidation(type: string): void {
    const validation = type === VehicleType.scooter ? null : Validators.required;
    const subtypeField = this.vehicleForm.get('subtype');

    subtypeField?.setValidators(validation);
    subtypeField?.updateValueAndValidity()
  }

  public validateLicense(): void {
    const licenseControl = this.vehicleForm.get('license');
    if (!licenseControl) return;

    const enteredLicense = licenseControl.value;
    if (!enteredLicense) {
      this.showLicenseError = false;
      return;
    }

    const licenseCheck = new KentekenCheck(enteredLicense);
    const licenseFormatted = licenseCheck.formatLicense();
    if (licenseCheck.valid) {
      licenseControl.setValue(licenseFormatted);
      this.showLicenseError = false;
      return;
    }

    if (enteredLicense.length === 6) {
      const shortLicenseCheck = new LicenseCheckHelper(enteredLicense);
      licenseControl.setValue(shortLicenseCheck.formatShortLicense());
      this.showLicenseError = false;
      return;
    }

    this.showLicenseError = true;
  }
}
