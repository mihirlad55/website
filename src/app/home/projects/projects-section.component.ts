import {Component, OnInit, HostListener} from '@angular/core';
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
  selectedProjectIndex: number = 0;
  windowWidth: number = window.innerWidth;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((res: GetProjectsResponse) => {
      // Sort by most starred
      this.projects = res.projects.sort((a, b) => {
        const bStars = (b.git ? b.git.stars : 0);
        const aStars = (a.git ? a.git.stars : 0);
        return bStars - aStars;
      });
      this.selectedProject = this.projects[this.selectedProjectIndex];
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }

  nextProject(): void {
    if (this.selectedProjectIndex + 1 < this.projects.length)
      this.selectedProjectIndex++;
    else
      this.selectedProjectIndex = 0;
    this.selectedProject = this.projects[this.selectedProjectIndex];
  }

  prevProject(): void {
    if (this.selectedProjectIndex - 1 > 0)
      this.selectedProjectIndex--;
    else
      this.selectedProjectIndex = this.projects.length - 1;
    this.selectedProject = this.projects[this.selectedProjectIndex];
  }

}
