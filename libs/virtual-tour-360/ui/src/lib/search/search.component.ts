import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SearchResultComponent } from "./../search-result/search-result.component";
@Component({
  selector: "virtual-tour-ui-search",
  standalone: true,
  imports: [CommonModule, FormsModule, SearchResultComponent],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string;
  @Input() searchIcon: string;
  @Input() items: any[];
  searchValue: string;
  isShowSearchResult: boolean = false;
  @Output()
  onSearchTextChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onSearchResultItemClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
  handleSearchValueChange() {
    this.onSearchTextChange.emit(this.searchValue);
  }
  handleInputFocus() {
    this.isShowSearchResult = true;
  }
  handleInputBlur() {
    this.isShowSearchResult = false;
  }

  handleSearchResultItemClick(index: any) {
    this.isShowSearchResult = false;
    this.onSearchResultItemClick.emit(index);
  }
}
