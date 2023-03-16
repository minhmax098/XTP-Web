import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TourService {
  constructor(private http: HttpClient) {}
  getTourById(id: number) {
    return this.http.get(`https://tour.xrcommunity.org/api/projects/${id}`);
  }
}
