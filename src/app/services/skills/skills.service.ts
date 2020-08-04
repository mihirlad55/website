import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'

export class Skill {
  name: string;
  description: string;
  level: number;
  icon_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsUrl = '/assets/json/skills.json'

  constructor(private http: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of([]) as Observable<Skill[]>);
      })
    );
  }
}
