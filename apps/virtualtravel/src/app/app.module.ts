import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { VtsRestModule } from "@vts-kit/angular-network";
import { AppComponent } from "./app.component";
import { NETWORK_MODULE_CONFIG, TRANSLATE_MODULE_CONFIG } from "./configs";
import ROUTES from "./routes";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    VtsRestModule.forRoot(NETWORK_MODULE_CONFIG),
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
