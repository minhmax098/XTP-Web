import { ActivatedRoute } from "@angular/router";
import { TourService } from "./../services/tour.service";
import { SearchComponent } from "./../../../../ui/src/lib/search/search.component";
import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import { CompassPlugin } from "@photo-sphere-viewer/compass-plugin";
import { Viewer } from "@photo-sphere-viewer/core";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MatSidenavModule } from "@angular/material/sidenav";
import * as $ from "jquery";
declare var vtmapgl: any;
@Component({
  selector: "virtual-tour-feature-tour",
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatSidenavModule, SearchComponent],
  templateUrl: "./tour.component.html",
  styleUrls: ["./tour.component.scss"],
})
export class TourComponent implements OnInit, AfterViewInit {
  @ViewChild("tourContainer") tourContainer: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild("infoPopperButton") infoPopperButton: ElementRef;
  @ViewChild("nearbyLocationsBtnSidebar") sidebarBtn: ElementRef;
  @ViewChild("drawer") sidebar: ElementRef;

  accessToken: string = "acfda3fa21ccc80fc6946681c4d6729f";
  baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";
  isShowMap = false;
  isSidebarOpen = false;
  searchResultItems: any[];
  tourData: any;

  constructor(
    private renderer: Renderer2,
    private tourAPI: TourService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const viewer = new Viewer({
      container: this.tourContainer.nativeElement,
      panorama: this.baseUrl + "sphere.jpg",
      loadingImg: "/assets/template/map/icons/loading.gif",
      plugins: [
        [
          AutorotatePlugin,
          { autostartDelay: 1000000000, autorotatePitch: "5deg" },
        ],

        MarkersPlugin,

        [
          VirtualTourPlugin,
          {
            positionMode: "manual",
            renderMode: "3d",
            arrowStyle: {
              color: "#fff",
              hoverColor: "#ee0033",
              outlineColor: "#000",
              scale: [0.5, 2],
              cursor: "pointer",
            },
            markerStyle: {
              html: null,
              image: "assets/template/map/icons/uncluster-marker.svg",
            },
          },
        ],
        [
          CompassPlugin,
          {
            hotspots: [
              { yaw: "0deg" },
              { yaw: "90deg" },
              { yaw: "180deg" },
              { yaw: "270deg" },
            ],
          },
        ],
        [
          GalleryPlugin,
          {
            visibleOnLoad: true,
            thumbnailSize: { width: 100, height: 100 },
          },
        ],
      ],
      keyboard: "always",
      touchmoveTwoFingers: true,
      navbar: [
        "autorotate",
        "zoom",
        "move",
        "markers",
        "markersList",
        "download",
        "gallery",
        "caption",
        "description",
        {
          id: "info-button",
          title: "Information",
          content: `<svg width="20" height="20" class="psv-button-svg" viewBox="0 0 12 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.78978 0.0246917C6.31965 -0.0377372 6.85603 0.0185381 7.36388 0.189841C7.87173 0.361143 8.33962 0.643617 8.73698 1.01881C9.13434 1.394 9.45223 1.85346 9.66987 2.36716C9.8875 2.88087 10 3.43727 10 4C10 4.56273 9.8875 5.11913 9.66987 5.63284C9.45223 6.14654 9.13434 6.606 8.73698 6.98119C8.33962 7.35638 7.87173 7.63886 7.36388 7.81016C6.85603 7.98146 6.31965 8.03774 5.78978 7.97531C5.2921 7.97531 4.79929 7.87184 4.3395 7.67083C3.8797 7.46981 3.46191 7.17517 3.11 6.80374C2.39928 6.05359 2 5.03617 2 3.97531C2.01231 2.92302 2.41702 1.91825 3.12641 1.17875C3.8358 0.439253 4.79272 0.0246115 5.78978 0.0246917Z" fill="white"/>
<path d="M12 32H0V30.1432L1.51111 29.4536C1.91692 29.2701 2.26621 28.9433 2.51238 28.5168C2.75855 28.0903 2.88989 27.5843 2.88889 27.0663V16.9867C2.88989 16.4688 2.75855 15.9628 2.51238 15.5362C2.26621 15.1097 1.91692 14.7829 1.51111 14.5995L0 13.9098V12H9.11111V27.0663C9.11011 27.5843 9.24145 28.0903 9.48762 28.5168C9.73379 28.9433 10.0831 29.2701 10.4889 29.4536L12 30.1432V32Z" fill="white"/>
</svg>

`,
          onClick: () => {
            this.trigger.openMenu();
          },
          className: "psv-button--hover-scale",
        },
        {
          id: "volumn-button",
          title: "Volumn Adjustment",
          content: `<svg width="20" height="20" viewBox="0 0 26 26" class="psv-button-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8889 3.05359V0C21.6811 1.34892 26 6.65564 26 13C26 19.3444 21.6811 24.6511 15.8889 26V22.9464C20.0634 21.6716 23.1111 17.699 23.1111 13C23.1111 8.30103 20.0634 4.32839 15.8889 3.05359ZM0 17.447V8.55302H5.77778L13 1.14139V24.8586L5.77778 17.447H0ZM10.1111 17.6988V8.30083L6.97663 11.5175H2.88885V14.4821H6.97663L10.1111 17.6988ZM19.5 13.0002C19.5 10.3764 18.0266 8.1233 15.8889 7.02638V18.9591C18.0266 17.877 19.5 15.6239 19.5 13.0002Z" fill="white"/>
</svg>
`,
          onClick: () => {
            console.log("Volumn Clicked");
          },
          className: "psv-button--hover-scale",
        },
        {
          id: "video-button",
          title: "Video Tour",
          content: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="psv-button-svg" fill="#fff" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>`,
          onClick: () => {
            window.open("http://localhost:8000/virtual-tour/video-tour");
          },
          className: "psv-button--hover-scale",
        },
        {
          id: "vr-button",
          title: "Virtual Reality",
          content: `<svg width="28" height="16" viewBox="0 0 28 16" class="psv-button-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 0C18.0438 0 22.0915 0.576056 26.1412 1.72733C27.1651 2.01841 27.9029 3.02202 27.9911 4.20642L28 4.44556V9.39786C28 12.9336 25.5688 15.8202 22.5133 15.9919L22.2251 16H18.7667C17.752 16 16.7823 15.5423 16.0647 14.7339L15.8754 14.5049L14.9613 13.3163L14.8451 13.1835C14.3551 12.6911 13.6285 12.704 13.1526 13.1862L13.0392 13.3165L12.126 14.5043C11.456 15.3758 10.5148 15.9064 9.50979 15.9887L9.23426 16H5.77553C2.68245 16 0.157269 13.2202 0.00706825 9.72668L0 9.39713V4.44552C0 3.15894 0.766656 2.03782 1.85877 1.72733C5.90852 0.576056 9.95618 0 14 0ZM14 2.40082C10.1284 2.40082 6.25085 2.95267 2.36554 4.0572C2.24073 4.09269 2.14567 4.20229 2.11264 4.33881L2.1 4.44552V9.39713C2.1 11.6286 3.62144 13.4538 5.54308 13.5909L5.77553 13.5992H9.23426C9.67462 13.5992 10.0963 13.4095 10.4175 13.0726L10.5487 12.9193L11.4619 11.7315C12.6941 10.1288 14.8295 9.97145 16.2315 11.3802L16.3898 11.55L16.5384 11.731L17.4525 12.9196C17.7432 13.2976 18.1461 13.5344 18.5794 13.5877L18.7667 13.5992H22.2251C24.1766 13.5992 25.7729 11.8601 25.8928 9.66356L25.9 9.39786V4.44549C25.9 4.26171 25.7905 4.10156 25.6345 4.0572C21.7492 2.95267 17.8716 2.40082 14 2.40082ZM20.6523 4.80165L22.7523 4.80805C23.3322 4.80982 23.8011 5.34869 23.7995 6.01166C23.7981 6.61938 23.4019 7.12042 22.8892 7.19834L22.7467 7.20887L20.6467 7.20247C20.0668 7.2007 19.598 6.66182 19.5995 5.99886C19.601 5.39114 19.9972 4.8901 20.5098 4.81217L20.6523 4.80165ZM7.35046 4.80165C7.93035 4.80165 8.40046 5.33909 8.40046 6.00206C8.40046 6.60978 8.00544 7.11202 7.49293 7.19151L7.35046 7.20247H5.24591C4.66601 7.20247 4.19591 6.66503 4.19591 6.00206C4.19591 5.39434 4.59092 4.89209 5.10343 4.8126L5.24591 4.80165H7.35046ZM14 4.00137C14.5799 4.00137 15.05 4.53881 15.05 5.20178C15.05 5.86475 14.5799 6.40219 14 6.40219C13.4201 6.40219 12.95 5.86475 12.95 5.20178C12.95 4.53881 13.4201 4.00137 14 4.00137Z" fill="white"/>
</svg>
`,
          onClick: () => {
            console.log("VR Clicked");
          },
          className: "psv-button--hover-scale",
        },
        {
          id: "map-button",
          title: "Map",
          content: `<svg width="23" height="20" viewBox="0 0 27 24" class="psv-button-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.2667 4.59769L17.9333 0.0960369C17.8162 0.0368866 17.6842 0.00582077 17.55 0.00582077C17.4157 0.00582077 17.2837 0.0368866 17.1667 0.0960369L9.16667 4.37261L1.26668 0.0960369C1.13596 0.03299 0.989971 0 0.84168 0C0.693389 0 0.547396 0.03299 0.41668 0.0960369C0.292884 0.163683 0.189888 0.25818 0.117103 0.370894C0.0443168 0.483608 0.00406139 0.610946 1.41338e-05 0.741274V18.7479C-0.000823398 18.8774 0.0355748 19.0049 0.105668 19.1179C0.175762 19.231 0.277165 19.3258 0.400014 19.3931L8.73334 23.8948C8.85042 23.9539 8.98242 23.985 9.11667 23.985C9.25092 23.985 9.38292 23.9539 9.5 23.8948L17.4 19.6182L25.3 23.8948C25.4303 23.9663 25.5807 24.0028 25.7333 23.9998C25.878 23.9988 26.0205 23.968 26.15 23.9098C26.2948 23.8527 26.4195 23.7609 26.5106 23.6445C26.6017 23.5282 26.6556 23.3916 26.6667 23.2496V5.24293C26.6675 5.11345 26.6311 4.98597 26.561 4.8729C26.4909 4.75984 26.3895 4.66503 26.2667 4.59769ZM1.66668 2.06176L8.33334 5.66309V21.9291L1.66668 18.3277V2.06176ZM19.4167 12.9708L17.5 14.6814L15.5833 12.9708C15.1298 12.5037 14.8903 11.899 14.9134 11.279C14.9365 10.659 15.2204 10.07 15.7076 9.63138C16.1948 9.19272 16.849 8.93713 17.5376 8.91636C18.2262 8.89559 18.8979 9.11119 19.4167 9.51951C19.9195 9.97979 20.2013 10.5995 20.2013 11.2451C20.2013 11.8907 19.9195 12.5105 19.4167 12.9708ZM25 21.9741L18.3333 18.3728V16.0619L20.5833 14.0212C20.9915 13.6583 21.3156 13.226 21.5368 12.7495C21.758 12.2729 21.8719 11.7616 21.8719 11.2451C21.8719 10.7287 21.758 10.2173 21.5368 9.7408C21.3156 9.26427 20.9915 8.83202 20.5833 8.46912C19.7525 7.75545 18.6483 7.35728 17.5 7.35728C16.3517 7.35728 15.2475 7.75545 14.4167 8.46912C14.0105 8.83304 13.6882 9.26562 13.4683 9.74202C13.2484 10.2184 13.1351 10.7292 13.1351 11.2451C13.1351 11.761 13.2484 12.2719 13.4683 12.7483C13.6882 13.2247 14.0105 13.6572 14.4167 14.0212L16.6667 16.0619V18.3277L10 21.9291V5.66309L16.6667 2.06176V5.24293C16.6667 5.44192 16.7545 5.63275 16.9107 5.77346C17.067 5.91416 17.279 5.99321 17.5 5.99321C17.721 5.99321 17.933 5.91416 18.0893 5.77346C18.2455 5.63275 18.3333 5.44192 18.3333 5.24293V2.06176L25 5.66309V21.9741ZM18.0833 10.7199C18.1975 10.8248 18.275 10.9576 18.3062 11.1017C18.3374 11.2459 18.321 11.3951 18.2589 11.5309C18.1967 11.6667 18.0917 11.7831 17.9568 11.8657C17.8219 11.9482 17.6631 11.9934 17.5 11.9954C17.3959 12.0177 17.2874 12.0177 17.1833 11.9954C17.0793 11.9634 16.9871 11.9063 16.9167 11.8304C16.8369 11.763 16.7734 11.6816 16.73 11.5913C16.6865 11.501 16.6641 11.4036 16.6641 11.3052C16.6641 11.2067 16.6865 11.1093 16.73 11.019C16.7734 10.9287 16.8369 10.8473 16.9167 10.78C17.0635 10.6342 17.2681 10.5462 17.4864 10.535C17.7046 10.5238 17.919 10.5902 18.0833 10.7199Z" fill="white"/>
</svg>
`,
          onClick: () => {
            this.initMap();
          },
          className: "psv-button--hover-scale",
        },
        "fullscreen",
      ],
    });

    const virtualTour = viewer.getPlugin(VirtualTourPlugin);
    const markerPlugin = viewer.getPlugin(MarkersPlugin);
    this.tourAPI
      .getTourById(parseInt(this.route.snapshot.paramMap.get("id") as string))
      .subscribe((res: any) => {
        this.tourData = res.data;
        // @ts-ignore
        // virtualTour.setNodes(this.tourData?.nodes, this.tourData?.nodes[0].id);
        markerPlugin.addEventListener(
          "select-marker",
          ({ marker, doubleClick, rightClick }) => {
            console.log(`Clicked on marker ${marker.id}`);
          }
        );
      });

    //@ts-ignore
    virtualTour.setNodes(
      [
        {
          id: 1,
          panorama: "/assets/template/map/images/KhanhHoa/1.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/1.jpg",
          name: "One",
          links: [
            {
              id: 1,
              name: null,
              position: {
                yaw: "210deg",
                pitch: "0deg",
              },
              nodeId: 2,
            },
          ],
          markers: [
            {
              id: 1,
              position: {
                yaw: "90deg",
                pitch: "15deg",
              },
              size: {
                width: 250,
                height: 250,
              },
              scale: {
                zoom: [0.3, 1],
                yaw: [1, 1.5],
              },
              image:
                "https://api.xrcommunity.org/minio/api/v1/buckets/thanh/objects/download?preview=true&prefix=VHJhbmdfQW4vYWlyLWhvdC1iYWxsb29uLmdpZg==&version_id=2627f844-fab3-4f64-b9a7-612231ff804e",
              tooltip: "Đường Phố",
              anchor: "center center",
              data: { affiliateProject: 2 },
            },
          ],
          description: "Description 1",
          caption: "Caption 1",
          panoData: { poseHeading: 327 },
        },
        {
          id: 2,
          panorama: "/assets/template/map/images/KhanhHoa/2.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/2.jpg",
          name: "Two",
          links: [
            {
              id: 2,
              name: null,
              position: {
                yaw: "30deg",
                pitch: "0deg",
              },
              nodeId: 1,
            },
            {
              id: 3,
              name: null,
              position: {
                yaw: "-145deg",
                pitch: "0deg",
              },
              nodeId: 3,
            },
          ],
          description: "Description 2",
          caption: "Caption 2",
          panoData: { poseHeading: 318 },
        },
        {
          id: 3,
          panorama: "/assets/template/map/images/KhanhHoa/3.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/3.jpg",
          name: "Three",
          links: [
            {
              id: 4,
              name: null,
              position: {
                yaw: "-220deg",
                pitch: "0deg",
              },
              nodeId: 4,
            },
            {
              id: 5,
              name: null,
              position: {
                yaw: "-130deg",
                pitch: "0deg",
              },
              nodeId: 5,
            },
            {
              id: 6,
              name: null,
              position: {
                yaw: "-40deg",
                pitch: "0deg",
              },
              nodeId: 6,
            },
            {
              id: 7,
              name: null,
              position: {
                yaw: "40deg",
                pitch: "0deg",
              },
              nodeId: 2,
            },
          ],
          markers: [],
          description: "Description 3",
          caption: "Caption 3",
          panoData: { poseHeading: 328 },
        },
        {
          id: 4,
          panorama: "/assets/template/map/images/KhanhHoa/4.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/4.jpg",
          name: "Four",
          links: [
            {
              id: 8,
              name: null,
              position: {
                yaw: "60deg",
                pitch: "0deg",
              },
              nodeId: 3,
            },
          ],
          markers: [],
          description: "Description 4",
          caption: "Caption 4",
          panoData: { poseHeading: 78 },
        },
        {
          id: 5,
          panorama: "/assets/template/map/images/KhanhHoa/5.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/5.jpg",
          name: "Five",
          links: [
            {
              id: 9,
              name: null,
              position: {
                yaw: "270deg",
                pitch: "0deg",
              },
              nodeId: 3,
            },
            {
              id: 10,
              name: null,
              position: {
                yaw: "85deg",
                pitch: "0deg",
              },
              nodeId: 7,
            },
          ],
          markers: [],
          description: "Description 5",
          caption: "Caption 5",
          panoData: { poseHeading: 190 },
        },
        {
          id: 6,
          panorama: "/assets/template/map/images/KhanhHoa/7.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/7.jpg",
          name: "Six",
          markers: [],
          links: [
            {
              id: 11,
              name: null,
              position: {
                yaw: "95deg",
                pitch: "0deg",
              },
              nodeId: 3,
            },
          ],
          description: "Description 6",
          caption: "Caption 6",
          panoData: { poseHeading: 328 },
        },
        {
          id: 7,
          panorama: "/assets/template/map/images/KhanhHoa/8.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/8.jpg",
          name: "Seven",
          links: [
            {
              id: 12,
              name: null,
              position: {
                yaw: "-35deg",
                pitch: "0deg",
              },
              nodeId: 5,
            },
            {
              id: 13,
              name: null,
              position: {
                yaw: "150deg",
                pitch: "0deg",
              },
              nodeId: 8,
            },
          ],
          markers: [],
          description: "Description 7",
          caption: "Caption 7",
          panoData: { poseHeading: 250 },
        },
        {
          id: 8,
          panorama: "/assets/template/map/images/KhanhHoa/9.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/9.jpg",
          name: "Eight",
          links: [
            {
              id: 14,
              name: null,
              position: {
                yaw: "-35deg",
                pitch: "0deg",
              },
              nodeId: 7,
            },
            {
              id: 15,
              name: null,
              position: {
                yaw: "-200deg",
                pitch: "0deg",
              },
              nodeId: 9,
            },
          ],
          markers: [],
          description: "Description 8",
          caption: "Caption 8",
          panoData: { poseHeading: 250 },
        },
        {
          id: 9,
          panorama: "/assets/template/map/images/KhanhHoa/10.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/10.jpg",
          name: "Nine",
          links: [
            {
              id: 16,
              name: null,
              position: {
                yaw: "-35deg",
                pitch: "0deg",
              },
              nodeId: 8,
            },
            {
              id: 17,
              name: null,
              position: {
                yaw: "-200deg",
                pitch: "0deg",
              },
              nodeId: 10,
            },
          ],
          markers: [],
          description: "Description 9",
          caption: "Caption 9",
          panoData: { poseHeading: 250 },
        },
        {
          id: 10,
          panorama: "/assets/template/map/images/KhanhHoa/11.jpg",
          thumbnail: "/assets/template/map/images/KhanhHoa/11.jpg",
          name: "ten",
          links: [
            {
              id: 18,
              name: null,
              position: {
                yaw: "-35deg",
                pitch: "0deg",
              },
              nodeId: 9,
            },
          ],
          markers: [],
          description: "Description 10",
          caption: "Caption 10",
          panoData: { poseHeading: 250 },
        },
      ],
      1
    );
  }

  initMap() {
    this.isShowMap = true;
    vtmapgl.accessToken = this.accessToken;
    $(function () {
      let mapTemp = new vtmapgl.Map({
        container: document.getElementById("nearbyLocationsMapContainer"),
        style: vtmapgl.STYLES.VADMIN,
        center: [108.2022, 16.0544], // tọa độ trung tâm [lng, lat]
        zoom: 12, // mức zoom
        minZoom: 1,
      });
      mapTemp.on("load", () => {
        mapTemp.addControl(new vtmapgl.NavigationControl(), "bottom-right");
      });
    });
  }

  handleCloseMapPopup() {
    this.isShowMap = false;
  }
  handleSearchTextChange(data: any) {}
  handleSearchResultItemClick(data: any) {}
  handleSidebarButtonClick() {
    this.isSidebarOpen = !this.isSidebarOpen;
    (this.sidebar as any).toggle();
    if (this.isSidebarOpen) {
      this.renderer.setStyle(
        this.sidebarBtn.nativeElement,
        "background-image",
        "url(/assets/template/map/icons/btn-sidebar-close.svg)"
      );
      console.log(this.sidebarBtn);
      this.renderer.setStyle(this.sidebarBtn.nativeElement, "left", "348px");
    } else {
      this.renderer.setStyle(
        this.sidebarBtn.nativeElement,
        "background-image",
        "url(/assets/template/map/icons/btn-sidebar.svg)"
      );
      console.log(this.sidebarBtn);
      this.renderer.setStyle(this.sidebarBtn.nativeElement, "left", "0");
    }
  }
}
