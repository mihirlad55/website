import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {formatDate} from '@angular/common';
import {Project} from '../../../services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnChanges {
  @Input() project: Project;
  textBackdrop: string = '';
  showFullContent: boolean = false;
  date: string = '';
  tags: Set<string> = new Set();

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

    this.updateProjectDateString();
    this.updateTags();
  }

  updateProjectDateString(): void {
    const start = this.project.startDate ?
      formatDate(this.project.startDate, 'mediumDate', 'en-US') : '';
    const end = this.project.endDate ?
      formatDate(this.project.endDate, 'mediumDate', 'en-US') : '';

    if (start == '') this.date = '';
    else if (start == end) this.date = start;
    else if (end == '') this.date = `${start} - Present`;
    else this.date = `${start} - ${end}`;
  }

  updateTags(): void {
    this.tags = new Set();

    if (this.project.languages)
      for (const l of this.project.languages)
        this.tags.add(l);

    if (this.project.git && this.project.languages)
      for (const l of this.project.git.languages)
        this.tags.add(l);

    if (this.project.tools)
      for (const t of this.project.tools)
        this.tags.add(t);

    if (this.project.tags)
      for (const t of this.project.tags)
        this.tags.add(t);

  }
}
