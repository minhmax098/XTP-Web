import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenFormComponent } from './authen-form.component';

describe('AuthenFormComponent', () => {
  let component: AuthenFormComponent;
  let fixture: ComponentFixture<AuthenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
