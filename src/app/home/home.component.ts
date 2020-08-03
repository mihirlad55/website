import {Component, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../typewriter/typewriter.component';
import {SkillsService, Skill} from '../skills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('homeLoaded', [
      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      transition('hidden => shown', [animate('1s ease')])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('intro') intro: TypewriterComponent;
  @ViewChild('occupation') occupation: TypewriterComponent;

  skills: Skill[];
  isHomeLoaded = false;

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  ngAfterViewInit(): void {
    this.intro.start();
  }

  doneLoading(): void {
    this.isHomeLoaded = true;
  }
}
