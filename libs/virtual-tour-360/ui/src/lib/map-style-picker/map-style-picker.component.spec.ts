import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStylePickerComponent } from './map-style-picker.component';

describe('MapStylePickerComponent', () => {
  let component: MapStylePickerComponent;
  let fixture: ComponentFixture<MapStylePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MapStylePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapStylePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
