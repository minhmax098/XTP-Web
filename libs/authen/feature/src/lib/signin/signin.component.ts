import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent, AuthenFormComponent } from '@viettelweb/authen/ui';
import { TranslateModule } from '@ngx-translate/core';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'authen-feature-signin',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    RouterModule,
    ReactiveFormsModule,
    AuthenFormComponent,
    TranslateModule,
    VtsFormModule,
    VtsButtonModule,
    VtsTypographyModule,
    AppInputComponent
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
