import {Component, OnInit} from '@angular/core';
import {SkillsService, Skill} from '../../services/skills.service';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {
  skills: Skill[];

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }
}
