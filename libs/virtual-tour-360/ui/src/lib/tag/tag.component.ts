import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "virtual-tour-ui-tag",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.scss"],
})
export class TagComponent implements OnInit {
  @Input() tagName: string;
  @Input() tagIcon: string;
  @Input() isSelected: boolean;
  @Output() onFilterItemClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  handleFilterClick(): void {
    this.onFilterItemClick.emit(this.tagName);
  }
  getStyleOnFilter() {
    if (this.isSelected) {
      return {
        background: "#393131",
        color: "#fff",
      };
    } else return {};
  }
}
