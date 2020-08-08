import {Injectable} from '@angular/core';
import {Observable, of, merge} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const manualStatsUrl = '/assets/json/stats.json'
const getStatsUrl = 'https://api.mihirlad.com/get-stats';

export class Stat {
  name: string;
  description: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {


  constructor(private http: HttpClient) {}

  getStats(): Observable<Stat[]> {
    let manualStats = this.http.get<Stat[]>(manualStatsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of([]) as Observable<Stat[]>);
      })
    );

    let autoStats = this.http.get<Stat[]>(getStatsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
       return (of([]) as Observable<Stat[]>);
      })
    );

    return merge(manualStats, autoStats);
  }
}


