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
    if (this.project.git && this.project.git.languages)
      this.textBackdrop = this.project.git.languages.join(' ').concat(' ');

    if (this.project.languages)
      this.textBackdrop += this.project.languages.join(' ').concat(' ');

    if (this.project.tools)
    this.textBackdrop += this.project.tools.join(' ').concat(' ');

    while (this.textBackdrop.length < 600) {
      this.textBackdrop += this.textBackdrop;
    }
  }

}
