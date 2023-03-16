import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "virtual-tour-ui-search-result",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"],
})
export class SearchResultComponent implements OnInit {
  @Input() item_index: string;
  @Input() item_name: string;
  @Input() item_address: string;
  @Output() on_result_item_click: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  handleResultItemClick() {
    this.on_result_item_click.emit(this.item_index);
    console.log(this.item_index, this.item_name, this.item_address);
  }
}
