import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

@Component({
  selector: 'landing-ui-step-icon-item',
  standalone: true,
  imports: [CommonModule, VtsTypographyModule, VtsSpaceModule, VtsIconModule],
  templateUrl: './step-icon-item.component.html',
  styleUrls: ['./step-icon-item.component.scss'],
})
export class StepIconItemComponent implements OnInit {
  @Input() icon?: string = '';
  @Input() title?: string = '';
  @Input() description?: string = '';

  constructor() {}

  ngOnInit(): void {}
}
