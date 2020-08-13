import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Project} from '../../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnChanges {
  @Input() project: Project;
  textBackdrop: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.project.imageName = '';
    this.textBackdrop = this.project.git.languages.join(' ').concat(' ');
    while (this.textBackdrop.length < 500) {
      this.textBackdrop += this.textBackdrop;
    }
  }

}
