import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "virtual-tour-ui-marker-content",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./marker-content.component.html",
  styleUrls: ["./marker-content.component.scss"],
})
export class MarkerContentComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() description: string;
  @Input() id: string;
  @Input() btn_experience: string;

  constructor(private _router: Router) {}
  ngOnInit(): void {}
  ngAfterViewInit() {}
  navigateToTour() {
    this._router.navigateByUrl(`/virtual-tour/tour/${this.id}`);
  }
}
