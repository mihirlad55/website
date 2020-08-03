import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {SkillComponent} from './skills/skill/skill.component';
import {SkillsSectionComponent} from './skills/skills-section.component';
import {AppModule} from '../app.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SkillComponent,
    SkillsSectionComponent
  ],
  imports: [
    CommonModule,
    AppModule
  ]
})
export class HomeModule {}
