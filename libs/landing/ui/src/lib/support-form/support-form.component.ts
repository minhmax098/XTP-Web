import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { AppInputComponent } from '../app-input/app-input.component';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';

@Component({
  selector: 'landing-ui-support-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VtsFormModule,
    VtsButtonModule,
    VtsGridModule,
    TranslateModule,
    AppInputComponent,
  ],
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss'],
})
export class SupportFormComponent implements OnInit {
  supportForm: FormGroup = new FormGroup({
    fullName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required] }),
    phoneNumber: new FormControl('', { validators: [Validators.required] }),
  });

  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.supportForm.valid) {
      console.log('submit', this.supportForm.value);
    } else {
      Object.values(this.supportForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
