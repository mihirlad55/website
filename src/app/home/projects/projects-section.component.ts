import {Component, OnInit} from '@angular/core';
import {ProjectsService, Project, GetProjectsResponse}
  from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project = null;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((res: GetProjectsResponse) => {
      // Sort by most starred
      this.projects = res.projects.sort((a, b) => {
        return b.git.stars - a.git.stars;
      });
      this.selectedProject = this.projects[0];
    });
  }

}
