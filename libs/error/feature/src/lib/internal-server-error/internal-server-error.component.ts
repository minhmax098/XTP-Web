import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  selector: 'error-feature-internal-server-error',
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss'],
})
export class InternalServerErrorComponent implements OnInit {
  @Input() title = 'Internal Server Error';
  @Input() subtitle = 'Please retry later';
  @Input() okText = 'Go to homepage';
  @Input() cancelText = 'Retry';

  constructor() {}

  ngOnInit(): void {}
}
