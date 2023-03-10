import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';

/**
 * Should move this component to shared UI
 */
@Component({
  selector: 'authen-ui-app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, VtsIconModule, VtsInputModule],
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true,
    },
  ],
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() placeholder: string | null = null;
  @Input() type: string = 'text';

  public showPassword: boolean = false;
  public disabled: boolean = false;
  public _value: string = '';

  public get value() {
    return this._value;
  }

  public set value(v) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }

  constructor() {}

  clearValue() {
    this.value = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // #region Overwrite

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  updateChanges() {
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // #endregion
}