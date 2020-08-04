import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {SkillComponent} from './skills/skill/skill.component';
import {SkillsSectionComponent} from './skills/skills-section.component';
import {AppModule} from '../app.module';
import { IntroSectionComponent } from './intro-section/intro-section.component';
import { ParallaxDirective } from '../directives/parallax/parallax.directive';
import { StatsSectionComponent } from './stats-section/stats-section.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SkillComponent,
    SkillsSectionComponent,
    IntroSectionComponent,
    ParallaxDirective,
    StatsSectionComponent
  ],
  imports: [
    CommonModule,
    AppModule
  ]
})
export class HomeModule {}
