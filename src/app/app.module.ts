import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {TypewriterComponent} from './shared/typewriter/typewriter.component';

@NgModule({
  declarations: [
    AppComponent,
    TypewriterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    TypewriterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
