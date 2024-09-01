import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleImageComponent } from './vehicle-image.component';

describe('VehicleImageComponent', () => {
  let component: VehicleImageComponent;
  let fixture: ComponentFixture<VehicleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleImageComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct image source based on vehicle input', () => {
    component.vehicle = 'motor';

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('img');

    expect(imgElement?.src).toContain('/assets/motor.jpg');
  });
});
