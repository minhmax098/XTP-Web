import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';

@Component({
  selector: 'landing-ui-benefit-card',
  standalone: true,
  imports: [CommonModule, VtsIconModule, VtsTypographyModule, VtsSpaceModule],
  templateUrl: './benefit-card.component.html',
  styleUrls: ['./benefit-card.component.scss'],
})
export class BenefitCardComponent implements OnInit {
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: string | null;

  constructor() {}

  ngOnInit(): void {}
}
