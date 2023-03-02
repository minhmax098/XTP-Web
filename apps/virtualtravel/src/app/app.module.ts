import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import ROUTES from './routes';
import { VtsRestModule } from '@vts-kit/angular-network';
import { NETWORK_MODULE_CONFIG, TRANSLATE_MODULE_CONFIG } from './configs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    VtsRestModule.forRoot(NETWORK_MODULE_CONFIG),
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
