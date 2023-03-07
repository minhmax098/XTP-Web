import { Component, OnInit, Input, AfterViewInit, ViewRef, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Viewer } from '@photo-sphere-viewer/core';

// @Component({
//   selector: 'landing-feature-viewer3-d',
//   standalone: true,
//   imports: [CommonModule
//   ],
//   templateUrl: './viewer3-d.component.html',
//   styleUrls: ['./viewer3-d.component.scss']
// })


// 
@Directive({
  selector: '.viewer'
})

export class Viewer3DComponent implements OnInit, AfterViewInit {
  
  // Add argument for the tag
  // @Input() url?: string;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // console.log("3D viewer init success! " + this.url);
  }

}
