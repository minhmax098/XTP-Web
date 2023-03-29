import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import ROUTES from "./routes";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(ROUTES)],
})
export class VirtualTourFeatureModule {}
