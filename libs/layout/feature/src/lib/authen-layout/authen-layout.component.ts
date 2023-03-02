import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';

@Component({
  selector: 'layout-feature-authen-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, VtsTypographyModule],
  templateUrl: './authen-layout.component.html',
  styleUrls: ['./authen-layout.component.scss'],
})
export class AuthenLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
