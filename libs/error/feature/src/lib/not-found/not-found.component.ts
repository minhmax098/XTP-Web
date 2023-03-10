import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  selector: 'error-feature-not-found',
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  @Input() title = 'Error while connecting to server';
  @Input() subtitle = '';
  @Input() okText = 'Go to homepage';
  @Input() cancelText = 'Retry';

  constructor() {}

  ngOnInit(): void {}
}
