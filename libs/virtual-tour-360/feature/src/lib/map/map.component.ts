import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  ViewChild,
} from "@angular/core";
import { createCustomElement } from "@angular/elements";
import * as $ from "jquery";
import { LanguagePickerComponent } from "./../../../../ui/src/lib/language-picker/language-picker.component";
import { MapStylePickerComponent } from "./../../../../ui/src/lib/map-style-picker/map-style-picker.component";
import { MarkerContentComponent } from "./../../../../ui/src/lib/marker-content/marker-content.component";
import { SearchResultComponent } from "./../../../../ui/src/lib/search-result/search-result.component";
import { SearchComponent } from "./../../../../ui/src/lib/search/search.component";
import { MapService } from "./../services/map.service";
import { digitizedLocationsInterface } from "./map";
declare var vtmapgl: any;

@Component({
  selector: "virtual-tour-feature-map",
  standalone: true,
  imports: [
    CommonModule,
    LanguagePickerComponent,
    SearchComponent,
    MarkerContentComponent,
    SearchResultComponent,
    MapStylePickerComponent,
  ],
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  @ViewChild("mapContainer") mapContainer: ElementRef;
  digitizedLocations: digitizedLocationsInterface;
  map: any;
  searchResultItems = [];
  searchResultMarkers: any[] = [];
  isLoadTools = false;
  accessToken: string = "acfda3fa21ccc80fc6946681c4d6729f";
  geocoderService = new vtmapgl.GeocoderAPIService({
    accessToken: this.accessToken,
  });

  constructor(
    private digitizedLocationsAPI: MapService,
    private injector: Injector
  ) {
    const popUpContent = createCustomElement(MarkerContentComponent, {
      injector: injector,
    });
    if (!customElements.get("virtual-tour-ui-marker-content")) {
      customElements.define("virtual-tour-ui-marker-content", popUpContent);
    }
  }

  initMap(mapStyle: string = vtmapgl.STYLES.VTRANS) {
    vtmapgl.accessToken = this.accessToken;
    this.map = new vtmapgl.Map({
      container: this.mapContainer.nativeElement,
      style: mapStyle,
      center: [108.2022, 16.0544], // tọa độ trung tâm [lng, lat]
      zoom: 5, // mức zoom
      minZoom: 1,
    });
  }

  addBaseMarkers() {
    // add cluster marker icon
    const clusterMarkerIcon = new Image(40, 40);
    clusterMarkerIcon.onload = () =>
      this.map.addImage("cluster-marker-icon", clusterMarkerIcon);
    clusterMarkerIcon.src = "/assets/template/map/icons/cluster-marker.svg";
    // add un-cluster marker icon
    const mapMarkerIcon = new Image(40, 40);
    mapMarkerIcon.onload = () =>
      this.map.addImage("map-marker-icon", mapMarkerIcon);
    mapMarkerIcon.src = "/assets/template/map/icons/uncluster-marker.svg";
  }

  add360Locations() {
    // add source data
    this.map.addSource("digitizedLocations", {
      type: "geojson",
      data: this.digitizedLocations,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });
    // add layer
    this.map.addLayer({
      id: "clusters",
      type: "symbol",
      source: "digitizedLocations",
      filter: ["has", "point_count"],
      layout: {
        "icon-image": "cluster-marker-icon",
        "icon-allow-overlap": true,
      },
    });
    this.map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "digitizedLocations",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": 20,
        "text-line-height": 1,
      },
      paint: {
        "text-color": "#fff",
      },
    });
    this.map.addLayer({
      id: "unclustered-point",
      type: "symbol",
      source: "digitizedLocations",
      filter: ["!", ["has", "point_count"]],
      layout: {
        "icon-image": "map-marker-icon",
        "icon-allow-overlap": true,
      },
    });
    // inspect a cluster on click
    this.map.on("click", "clusters", (e: any) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      this.map
        .getSource("digitizedLocations")
        .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
          if (err) return;

          this.map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    this.map.on("click", "unclustered-point", (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const title = e.features[0].properties.name;
      const description = e.features[0].properties.description;
      const id = e.features[0].properties.id;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new vtmapgl.Popup({
        closeButton: false,
      })
        .setLngLat(coordinates)
        .setHTML(
          `<virtual-tour-ui-marker-content id="${id}" title="${title}" description="${description}" btn_experience="Trải nghiệm 360"></virtual-tour-ui-marker-content>`
        )
        .addTo(this.map);
    });

    this.map.on("mouseenter", "clusters", () => {
      this.map.getCanvas().style.cursor = "pointer";
    });
    this.map.on("mouseleave", "clusters", () => {
      this.map.getCanvas().style.cursor = "";
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on("load", () => {
      this.addBaseMarkers();
      if (this.digitizedLocations) {
        this.add360Locations();
      } else {
        this.digitizedLocationsAPI.getDigitizedLocations().subscribe({
          next: (result: any) => {
            this.digitizedLocations = result.data;
            this.add360Locations();
          },
          error: (error: any) => console.error("error:", error),
          complete: () => {},
        });
      }
      // add navigation control
      this.map.addControl(new vtmapgl.NavigationControl(), "bottom-right");
      this.isLoadTools = true;
    });
  }

  getPopupHtml(item: any) {
    return `<div style="font-weight: bold;border-bottom: solid 1px lightgray;padding: 8px 0;">${
      item.name == null ? "" : item.name
    } 
    </div>
                    <div style="margin-top: 8px;">
                        <span style="font-weight: bold">Địa chỉ: </span>
                        <span>${
                          item.address == null ? "N/A" : item.address
                        }</span>
                    </div>

                    <div>
                        <span style="font-weight: bold">Phone: </span>
                        <span>${item.phone == null ? "N/A" : item.phone}</span>
                    </div>

                    <div>
                        <span style="font-weight: bold">Email: </span>
                        <span>${item.mail == null ? "N/A" : item.mail}</span>
                    </div>
                `;
  }

  removeMarkers(markers: any[]) {
    markers.forEach((item: any) => {
      item.remove();
    });
    this.searchResultMarkers = [];
  }

  removePopups(markers: any[]) {
    markers.forEach((item: any) => {
      item.getPopup().remove();
    });
  }

  handleSearchResultItemClick(index: any) {
    const selectedItem = this.searchResultItems[parseInt(index)];
    if (selectedItem) {
      const coordinate = (selectedItem as any).location;
      this.map.flyTo({
        center: [coordinate.lng, coordinate.lat],
        zoom: this.map.getZoom(),
      });
      this.removePopups(this.searchResultMarkers);

      this.searchResultMarkers[parseInt(index)].getPopup().addTo(this.map);
    }
  }

  handleSearchTextChange(searchText: any) {
    this.geocoderService.fetchTextToAddress(
      searchText,
      0,
      10,
      (result: any, status: any) => {
        this.searchResultItems = result.items;
        const total = result.total;
        this.removeMarkers(this.searchResultMarkers);
        if (this.searchResultItems && this.searchResultItems.length > 0) {
          const bounds = new vtmapgl.LngLatBounds();
          $(".result-count").html(
            `Tìm thấy <strong>${this.searchResultItems.length}/${total}</strong> kết quả`
          );
          this.searchResultItems.forEach((item: any) => {
            const coordinate = item.location;
            const marker = new vtmapgl.Marker();
            marker.setLngLat([coordinate.lng, coordinate.lat]);
            marker.setPopup(
              new vtmapgl.Popup({ closeButton: false }).setHTML(
                this.getPopupHtml(item)
              )
            );
            marker.addTo(this.map);
            this.searchResultMarkers.push(marker);
            bounds.extend([coordinate.lng, coordinate.lat]);
            this.map.fitBounds(bounds, { padding: 50 });
          });
        } else {
          $(".result-count").html("Không tìm thấy kết quả!");
        }
      }
    );
  }

  handleStylePickerClick(style: string) {
    this.map.remove();
    this.initMap(vtmapgl.STYLES[`${style}`]);
    this.map.on("load", () => {
      this.addBaseMarkers();
      if (this.digitizedLocations) {
        this.add360Locations();
      }
      // add navigation control
      this.map.addControl(new vtmapgl.NavigationControl(), "bottom-right");
      this.isLoadTools = true;
    });
  }
}
