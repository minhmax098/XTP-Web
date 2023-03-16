import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'virtual-tour-ui-map-style-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-style-picker.component.html',
  styleUrls: ['./map-style-picker.component.scss']
})
export class MapStylePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
