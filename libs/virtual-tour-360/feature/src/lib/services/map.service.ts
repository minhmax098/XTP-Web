import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class MapService {
  constructor(private http: HttpClient) {}
  getDigitizedLocations() {
    return this.http.get("https://tour.xrcommunity.org/api/projects/geoJSON");
  }
}
