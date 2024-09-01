import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.scss']
})
export class VehicleImageComponent {
  @Input() public vehicle?: string;
}
