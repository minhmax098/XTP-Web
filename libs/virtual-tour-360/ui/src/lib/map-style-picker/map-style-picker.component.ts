import { MatMenuModule } from "@angular/material/menu";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "virtual-tour-ui-map-style-picker",
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: "./map-style-picker.component.html",
  styleUrls: ["./map-style-picker.component.scss"],
})
export class MapStylePickerComponent implements OnInit {
  constructor() {}

  @Output()
  onStylePickerClick: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {}

  handleClickStylePicker = (str: string) => {
    this.onStylePickerClick.emit(str);
  };
}
