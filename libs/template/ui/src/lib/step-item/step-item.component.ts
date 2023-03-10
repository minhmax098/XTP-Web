import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';

@Component({
  selector: 'template-ui-step-item',
  standalone: true,
  imports: [CommonModule, VtsTypographyModule, VtsSpaceModule],
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.scss'],
})
export class StepItemComponent implements OnInit {
  @Input() number: number | null = null;
  @Input() title?: string = '';
  @Input() description?: string = '';
  @Input() primary: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
