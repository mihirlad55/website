import {Component, OnInit, ViewChild} from '@angular/core';
import {TypewriterComponent} from '../typewriter/typewriter.component';
import {SkillsService, Skill} from '../skills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('intro') intro: TypewriterComponent;
  @ViewChild('occupation') occupation: TypewriterComponent;

  skills: Skill[];

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  ngAfterViewInit(): void {
    this.intro.start();
  }

}
