import { MarkerComponent } from "./../../../../ui/src/lib/marker/marker.component";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

declare var vtmapgl: any;
@Component({
  selector: "virtual-tour-feature-map",
  standalone: true,
  imports: [CommonModule, MarkerComponent],
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}
  @ViewChild("mapContainer") mapContainer: ElementRef;
  // @ViewChild(MarkerComponent, { static: true }) marker: MarkerComponent;
  @ViewChild("marker1") marker1: MarkerComponent;
  @ViewChild("marker2") marker2: MarkerComponent;
  @ViewChild("marker3") marker3: MarkerComponent;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    vtmapgl.accessToken = "acfda3fa21ccc80fc6946681c4d6729f";
    const map = new vtmapgl.Map({
      container: this.mapContainer.nativeElement,
      style: vtmapgl.STYLES.NORMAL,
      center: [108.2022, 16.0544], // tọa độ trung tâm [lng, lat]
      zoom: 5, // mức zoom
      minZoom: 1,
    });
    // add navigation control

    map.addControl(new vtmapgl.NavigationControl(), "bottom-right");
    // ----------------------------------
    (map as any).on("load", () => {
      // add marker to map
      console.log("hello", this.marker1.markerRed.nativeElement);
      new vtmapgl.Marker({
        element: this.marker1.markerRed.nativeElement,
      })
        .setPopup(new vtmapgl.Popup().setHTML("<h1>Da Nang City</h1>"))
        .setLngLat([108.2022, 16.0544])
        .addTo(map);

      new vtmapgl.Marker({
        element: this.marker2.markerRed.nativeElement,
      })
        .setPopup(new vtmapgl.Popup().setHTML("<h1>Ho Chi Minh City</h1>"))
        .setLngLat([106.6297, 10.8231])
        .addTo(map);
      new vtmapgl.Marker({
        element: this.marker3.markerRed.nativeElement,
      })
        .setPopup(new vtmapgl.Popup().setHTML("<h1>Ha Noi City</h1>"))
        .setLngLat([105.8342, 21.0278])
        .addTo(map);

      // ----------------------------------
      (map as any).addSource("earthquakes", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        cluster: true,
        clusterMaxZoom: 3, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });
      (map as any).addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });
      (map as any).addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });
      (map as any).addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
      // inspect a cluster on click
      (map as any).on("click", "clusters", (e: any) => {
        const features = (map as any).queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        (map as any)
          .getSource("earthquakes")
          .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
            if (err) return;

            (map as any).easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      (map as any).on("click", "unclustered-point", (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new vtmapgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
          .addTo(map);
      });

      (map as any).on("mouseenter", "clusters", () => {
        (map as any).getCanvas().style.cursor = "pointer";
      });
      (map as any).on("mouseleave", "clusters", () => {
        (map as any).getCanvas().style.cursor = "";
      });
    });
  }
}
