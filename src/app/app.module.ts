import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {RedirectGuard} from './redirect-guard';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [RedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
