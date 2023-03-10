import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent, AuthenFormComponent } from '@viettelweb/authen/ui';
import { TranslateModule } from '@ngx-translate/core';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    return formGroup &&
      formGroup.get('password')?.value !==
        formGroup.get('confirmPassword')?.value
      ? { match: true }
      : null;
  };
}

const passwordStrengthRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

@Component({
  selector: 'authen-feature-signup',
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
    VtsCheckboxModule,
    VtsTypographyModule,
    AppInputComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(passwordStrengthRegex),
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, matchPasswordValidator()],
    }),
    policy: new FormControl(false, { validators: Validators.requiredTrue }),
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.signUpForm.valid) {
      console.log('submit', this.signUpForm.value);
      this.router.navigate(['..', 'signin'], { relativeTo: this.route });
    } else {
      Object.values(this.signUpForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
