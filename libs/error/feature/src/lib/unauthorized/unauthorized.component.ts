import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  selector: 'error-feature-unauthorized',
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  @Input() title = 'Forbidden';
  @Input() subtitle = "You don't have permission to access this page";
  @Input() okText = 'Go to homepage';
  @Input() cancelText = null;

  constructor() {}

  ngOnInit(): void {}
}
