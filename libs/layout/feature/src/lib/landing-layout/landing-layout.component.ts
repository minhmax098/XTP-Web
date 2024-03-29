import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsIconModule, VtsIconService } from '@ui-vts/ng-vts/icon';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { map, merge, Subject, takeUntil } from 'rxjs';
import {
  gridResponsiveMap,
  VtsBreakpointService,
} from '@ui-vts/ng-vts/core/services';
import { LogoComponent } from '@viettelweb/layout/ui';

@Component({
  selector: 'layout-feature-landing-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    VtsTypographyModule,
    VtsGridModule,
    VtsSpaceModule,
    VtsIconModule,
    VtsButtonModule,
    VtsDrawerModule,
    LogoComponent,
  ],
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
})
export class LandingLayoutComponent implements OnInit, OnDestroy {
  // #region Data
  t = (v: string) => this.translateService.instant(v);
  emitter = merge(
    this.translateService.onLangChange,
    this.translateService.get(' ')
  );

  navActions$ = this.emitter.pipe(
    map(() => [
      {
        // introduction
        name: this.t('common.other.about'),
        primary: false,
        onClick: () => {this.scrollToElementId('step')}
      },
      {
        // benefits
        name: this.t('landing.layout.servicePrice'),
        primary: false,
        onClick: () => {this.scrollToElementId('price')}
      },
      {
        // features
        name: this.t('common.other.feature'),
        primary: false,
        onClick: () => {this.scrollToElementId('feature')}
      },
      {
        // contact
        name: this.t('common.other.contact'),
        primary: false,
        onClick: () => {this.scrollToElementId('support')}
      },
      {
        // experience
        name: this.t('landing.layout.contractConfirmation'),
        primary: true,
        onClick: () => {this.scrollToElementId('contractConfirm')}
      },
      {
        // signin
        name: this.t('common.action.signin'),
        primary: true,
        onClick: () => {this.goToPage('/authen/signin/')}
      },
    ])
  );

  companyContact$ = this.emitter.pipe(
    map(() => [
      {
        name: this.t('landing.layout.businessRegistrationNumber'),
        icon: 'CopyrightOutline:import',
        value: this.t('landing.layout.businessRegistrationNumberValue'),
      },
      {
        name: this.t('common.other.address'),
        icon: 'GeoOutline:import',
        value: '01 Trần Hữu Dực, Mỹ Đình, Từ Liêm, Hà Nội',
      },
      {
        name: this.t('common.other.hotline'),
        icon: 'PhoneOutlineLight:import',
        value: '18008000',
      },
      {
        name: this.t('common.other.email'),
        icon: 'MailOutline:import',
        value: 'cskh@viettel-solution.vn',
      },
    ])
  );

  footNavigation$ = this.emitter.pipe(
    map(() => [
      {
        title: this.t('common.other.product'),
        children: [
          this.t('common.other.feature'),
          this.t('landing.layout.pricePolicy'),
          this.t('common.other.support'),
        ],
      },
      {
        title: this.t('common.other.aboutUs'),
        children: [
          this.t('landing.layout.paymentPolicy'),
          this.t('landing.layout.productIntro'),
          this.t('landing.layout.operatingRegulation'),
          this.t('landing.layout.termOfUse'),
        ],
      },
    ])
  );

  trackByFn = () => false;
  // #endregion

  breakpoint$ = this.vtsBreakpoint.subscribe(gridResponsiveMap, true);
  drawerVisible = false;
  currentLang: string = '';
  destroy$ = new Subject();

  constructor(
    private iconService: VtsIconService,
    private translateService: TranslateService,
    private vtsBreakpoint: VtsBreakpointService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentLang =
      this.translateService.currentLang || this.translateService.defaultLang;
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        this.currentLang = e.lang;
      });
  }

  ngOnInit(): void {
    this.addIcon();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  addIcon() {
    this.iconService.addIcon({
      icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 12.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01A11.36 11.36 0 0 1 5.5 1c0-.55-.45-1-1-1H1C.45 0 0 .45 0 1c0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1ZM2.03 2h1.5c.07.88.22 1.75.46 2.59L2.79 5.8c-.41-1.21-.67-2.48-.76-3.8ZM16 15.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51Z" fill="currentColor"/>
      </svg>`,
      name: 'PhoneOutline:import',
    });
    this.iconService.addIcon({
      icon: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m15 8-1.41-1.42L7 13.17l-2.59-2.58L3 12l4 4 8-8Zm1-6h-4.18C11.4.84 10.3 0 9 0 7.7 0 6.6.84 6.18 2H2c-.14 0-.27.01-.4.04A2.008 2.008 0 0 0 .16 3.23C.06 3.46 0 3.72 0 4v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75ZM16 18H2V4h14v14Z" fill="currentColor"/>
      </svg>`,
      name: 'OrderOutline:import',
    });
    this.iconService.addIcon({
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.657 14.657L10.414 18.9C10.039 19.2746 9.53059 19.485 9.0005 19.485C8.47042 19.485 7.96202 19.2746 7.587 18.9L3.343 14.657C2.22422 13.5381 1.46234 12.1127 1.15369 10.5608C0.845043 9.00898 1.00349 7.40047 1.60901 5.93868C2.21452 4.4769 3.2399 3.22749 4.55548 2.34846C5.87107 1.46943 7.41777 1.00024 9 1.00024C10.5822 1.00024 12.1289 1.46943 13.4445 2.34846C14.7601 3.22749 15.7855 4.4769 16.391 5.93868C16.9965 7.40047 17.155 9.00898 16.8463 10.5608C16.5377 12.1127 15.7758 13.5381 14.657 14.657V14.657Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
      name: 'GeoOutline:import',
    });
    this.iconService.addIcon({
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#a)" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/>
          <path d="m3 7 9 6 9-6"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z"/>
          </clipPath>
        </defs>
      </svg>
    `,
      name: 'MailOutline:import',
    });
    this.iconService.addIcon({
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#a)" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
          <path d="m12 12 3 4m-6 0V8h4a2 2 0 0 1 0 4H9v4Z"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z"/>
          </clipPath>
        </defs>
      </svg>
    `,
      name: 'CopyrightOutline:import',
    });
    this.iconService.addIcon({
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#a)">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z"/>
          </clipPath>
        </defs>
      </svg>
    `,
      name: 'PhoneOutlineLight:import',
    });
  }

  toggleDrawer() {
    this.drawerVisible = true;
  }

  setTranslate(lang: string) {
    this.translateService.use(lang);
  }

  scrollToElementId(id: string) {
    const element = document.getElementById(id);
    if (!element) return
    const box = element.getBoundingClientRect()
    console.log(box)
    const top = box.y + window.pageYOffset - 150
    console.log(top)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  goToPage(pageName: string)
  {
    this.router.navigate([`${pageName}`]);
  }

  reload() {
    console.log(this.router.url)
    if (this.router.isActive('/landing/homepage', false))
      window.location.reload()
    else
      this.router.navigate(['/landing', 'homepage'])
  }
}
