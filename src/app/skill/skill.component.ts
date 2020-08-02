import {Component, OnInit, Input} from '@angular/core';
import {Skill} from '../skills.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {
  }

}
