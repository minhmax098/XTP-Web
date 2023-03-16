import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerContentComponent } from './marker-content.component';

describe('MarkerContentComponent', () => {
  let component: MarkerContentComponent;
  let fixture: ComponentFixture<MarkerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MarkerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
