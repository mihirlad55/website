import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'

export class GitInfo {
  domain: 'github' | 'gitlab' | null;
  owner: string;
  projectUrl: string;
  isFork: boolean;
  description: string;
  topics: string[];
  languages: string[];
  stars: number;
  forks: number;
  commits: number;
  additions: number;
  deletions: number;
}

export class Project {
  name: string;
  id: string; // Should match project name on github/gitlab
  brief: string; // Max 100 characters
  fullDescription: string;
  startDate: Date;
  endDate: Date | null; // null means no end date or continued in present
  imageName: string;
  languages: string[];
  tools: string[];
  tags: string[];
  git: GitInfo;
}

const projectsUrl = 'https://us-central1-mihirlad-website.cloudfunctions.net/get-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(projectsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of([]) as Observable<Project[]>);
      })
    );
  }
}
