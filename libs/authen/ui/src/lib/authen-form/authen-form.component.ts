import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'authen-ui-authen-form',
  standalone: true,
  imports: [CommonModule, VtsSpaceModule, VtsTypographyModule],
  templateUrl: './authen-form.component.html',
  styleUrls: ['./authen-form.component.scss'],
})
export class AuthenFormComponent implements OnInit {
  @Input() contentMargin: boolean = true;
  @Input() title: string = '';
  currentLang: string = '';
  destroy$ = new Subject()

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translateService.currentLang || this.translateService.defaultLang
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.currentLang = e.lang
    })
  }

  ngOnDestroy(): void { 
    this.destroy$.next(null)
    this.destroy$.complete()
  }

  setTranslate(lang: string) {
    this.translateService.use(lang)
  }
}
