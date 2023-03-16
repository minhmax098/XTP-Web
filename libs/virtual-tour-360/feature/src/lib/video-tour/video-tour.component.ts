import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Viewer } from "@photo-sphere-viewer/core";
import { EquirectangularVideoAdapter } from "@photo-sphere-viewer/equirectangular-video-adapter";
import { ResolutionPlugin } from "@photo-sphere-viewer/resolution-plugin";
import { SettingsPlugin } from "@photo-sphere-viewer/settings-plugin";
import { VideoPlugin } from "@photo-sphere-viewer/video-plugin";
@Component({
  selector: "virtual-tour-feature-video-tour",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-tour.component.html",
  styleUrls: ["./video-tour.component.scss"],
})
export class VideoTourComponent implements OnInit, AfterViewInit {
  constructor() {}
  @ViewChild("videoTourContainer") videoTourContainer: ElementRef;

  baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const viewer = new Viewer({
      container: this.videoTourContainer.nativeElement,
      adapter: [
        EquirectangularVideoAdapter,
        {
          muted: true,
        },
      ],
      caption: "Video Tour Demo",
      loadingImg: this.baseUrl + "loader.gif",
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      navbar: "video caption settings fullscreen",
      plugins: [
        [
          VideoPlugin,
          {
            keypoints: [
              { time: 0, position: { yaw: 0, pitch: 0 } },
              { time: 5, position: { yaw: -Math.PI / 4, pitch: Math.PI / 8 } },
              { time: 10, position: { yaw: -Math.PI / 2, pitch: 0 } },
              {
                time: 15,
                position: { yaw: (-3 * Math.PI) / 4, pitch: -Math.PI / 8 },
              },
              { time: 20, position: { yaw: -Math.PI, pitch: 0 } },
              {
                time: 25,
                position: { yaw: (-5 * Math.PI) / 4, pitch: Math.PI / 8 },
              },
              { time: 30, position: { yaw: (-3 * Math.PI) / 2, pitch: 0 } },
              {
                time: 35,
                position: { yaw: (-7 * Math.PI) / 4, pitch: -Math.PI / 8 },
              },
            ],
          },
        ],
        AutorotatePlugin,
        SettingsPlugin,
        [
          ResolutionPlugin,
          {
            defaultResolution: "HD",
            resolutions: [
              {
                id: "UHD",
                label: "Ultra high",
                panorama: {
                  source:
                    this.baseUrl + "equirectangular-video/Ayutthaya_UHD.mp4",
                },
              },
              {
                id: "FHD",
                label: "High",
                panorama: {
                  source:
                    this.baseUrl + "equirectangular-video/Ayutthaya_FHD.mp4",
                },
              },
              {
                id: "HD",
                label: "Standard",
                panorama: {
                  source:
                    this.baseUrl + "equirectangular-video/Ayutthaya_HD.mp4",
                },
              },
              {
                id: "SD",
                label: "Low",
                panorama: {
                  source:
                    this.baseUrl + "equirectangular-video/Ayutthaya_SD.mp4",
                },
              },
            ],
          },
        ],
      ],
    });
  }
}
