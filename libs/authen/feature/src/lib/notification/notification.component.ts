import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenFormComponent } from '@viettelweb/authen/ui';
import { TranslateModule } from '@ngx-translate/core';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'authen-feature-notification',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AuthenFormComponent,
    TranslateModule,
    VtsFormModule,
    VtsButtonModule,
    VtsTypographyModule,
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
