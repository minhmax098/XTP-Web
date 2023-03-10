import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInputComponent, AuthenFormComponent } from '@viettelweb/authen/ui';
import { TranslateModule } from '@ngx-translate/core';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'authen-feature-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    RouterModule,
    ReactiveFormsModule,
    AuthenFormComponent,
    TranslateModule,
    VtsFormModule,
    VtsTypographyModule,
    VtsButtonModule,
    VtsGridModule,
    AppInputComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.forgotForm.valid) {
      console.log('submit', this.forgotForm.value);
      this.router.navigate(['..', 'notification'], { relativeTo: this.route });
    } else {
      Object.values(this.forgotForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
