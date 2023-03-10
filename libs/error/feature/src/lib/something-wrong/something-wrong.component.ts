import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  selector: 'error-feature-something-wrong',
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  templateUrl: './something-wrong.component.html',
  styleUrls: ['./something-wrong.component.scss'],
})
export class SomethingWrongComponent implements OnInit {
  @Input() title = 'Something went wrong';
  @Input() subtitle = 'Please contact our support team for more information';
  @Input() okText = 'Go to homepage';
  @Input() cancelText = null;

  constructor() {}

  ngOnInit(): void {}
}
