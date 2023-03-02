import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'landing-feature-introduce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
