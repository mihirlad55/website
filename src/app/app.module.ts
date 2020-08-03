import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TypewriterComponent} from './shared/typewriter/typewriter.component';
import {SkillComponent} from './skill/skill.component';
import {SkillsSectionComponent} from './skills-section/skills-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TypewriterComponent,
    SkillComponent,
    SkillsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
