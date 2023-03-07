import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';
// import { RouterModule, Router, ActivatedRoute } from '@angular/router';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'error-feature-internal-server-error',
  standalone: true,
  imports: [
    CommonModule,
    VtsResultModule, 
    // RouterModule,
    // TranslateModule,
  ],
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss'],
})
export class InternalServerErrorComponent implements OnInit {
  @Input() title = 'Internal Server Error';
  @Input() subtitle = 'Please retry later';
  @Input() okText = 'Go to homepage';
  @Input() cancelText = 'Retry';

  // #region Data 
  constructor() {}
  //   private translateSer: TranslateService, 
  //   private router: Router,
  // ) 
  //   {    
  //     this.translate = translate;
  //    } 

  ngOnInit(): void {}

  // goToPage(pageName: string)
  // {
  //   this.router.navigate(['${pageName}'])
  // }
}
