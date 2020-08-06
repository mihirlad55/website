import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'

export class Stat {
  name: string;
  description: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private statsUrl = '/assets/json/stats.json'

  constructor(private http: HttpClient) {}

  getStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(this.statsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of([]) as Observable<Stat[]>);
      })
    );
  }
}


