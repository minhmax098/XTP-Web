import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewer3DComponent } from './viewer3-d.component';

describe('Viewer3DComponent', () => {
  let component: Viewer3DComponent;
  let fixture: ComponentFixture<Viewer3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Viewer3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewer3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
