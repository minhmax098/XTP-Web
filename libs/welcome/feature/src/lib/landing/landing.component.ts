import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IntroComponent,
  GuidelineComponent,
} from '@viettelweb/welcome/ui';

@Component({
  selector: 'welcome-feature-landing',
  standalone: true,
  imports: [CommonModule, IntroComponent, GuidelineComponent],
  template: `
    <welcome-ui-intro></welcome-ui-intro>
    <welcome-ui-guideline></welcome-ui-guideline>
  `,
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
