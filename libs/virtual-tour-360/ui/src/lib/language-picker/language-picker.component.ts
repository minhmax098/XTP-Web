import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "virtual-tour-ui-language-picker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./language-picker.component.html",
  styleUrls: ["./language-picker.component.scss"],
})
export class LanguagePickerComponent implements OnInit {
  @ViewChild("lang1") lang1: ElementRef;
  @ViewChild("lang2") lang2: ElementRef;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  handleLanguagePickerClick = (numString: String) => {
    if (numString == "1") {
      this.renderer.setStyle(
        this.lang1.nativeElement,
        "backgroundImage",
        "url(assets/template/map/icons/chosen-english-language.svg)"
      );
      this.renderer.setStyle(this.lang1.nativeElement, "height", "32px");
      this.renderer.setStyle(this.lang1.nativeElement, "width", "32px");
      this.renderer.setStyle(
        this.lang2.nativeElement,
        "backgroundImage",
        "url(assets/template/map/icons/vietnamese-language.svg)"
      );
      this.renderer.setStyle(this.lang2.nativeElement, "height", "24px");
      this.renderer.setStyle(this.lang2.nativeElement, "width", "24px");
    } else {
      this.renderer.setStyle(
        this.lang1.nativeElement,
        "backgroundImage",
        "url(assets/template/map/icons/english-language.svg)"
      );
      this.renderer.setStyle(this.lang1.nativeElement, "height", "24px");
      this.renderer.setStyle(this.lang1.nativeElement, "width", "24px");
      this.renderer.setStyle(
        this.lang2.nativeElement,
        "backgroundImage",
        "url(assets/template/map/icons/chosen-vietnamese-language.svg)"
      );
      this.renderer.setStyle(this.lang2.nativeElement, "height", "32px");
      this.renderer.setStyle(this.lang2.nativeElement, "width", "32px");
    }
  };
}
