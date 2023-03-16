import { ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "virtual-tour-ui-marker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./marker.component.html",
  styleUrls: ["./marker.component.scss"],
})
export class MarkerComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {}
  @ViewChild("markerRed") markerRed: ElementRef;
  ngAfterViewInit(): void {
    this.renderer.addClass(this.markerRed.nativeElement, "map-marker-red-gif");
  }
}
