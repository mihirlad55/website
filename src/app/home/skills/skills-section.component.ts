import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';
import {SkillsService, Skill} from '../../services/skills.service';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('skillsHeading') skillsHeading: TypewriterComponent;

  skills: Skill[];

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  ngAfterViewInit(): void {
    this.skillsHeading.start();
  }

}
