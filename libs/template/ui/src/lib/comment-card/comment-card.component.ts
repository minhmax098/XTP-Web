import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

@Component({
  selector: 'template-ui-comment-card',
  standalone: true,
  imports: [CommonModule, VtsSpaceModule, VtsTypographyModule, VtsIconModule],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() avatar?: string = '';
  @Input() title?: string = '';
  @Input() subtitle?: string = '';
  @Input() description?: string = '';
  @Input() icon?: string = '';

  constructor() {}

  ngOnInit(): void {}
}
