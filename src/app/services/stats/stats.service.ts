import {Injectable} from '@angular/core';
import {Observable, of, merge} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const manualStatsUrl = '/assets/json/stats.json'
const getStatsUrl = 'https://us-central1-mihirlad-website.cloudfunctions.net/get-stats';

export class Stat {
  name: string;
  description: string;
  value: string;
}

export class GetStatsResponse {
  dateUpdated: string;
  stats: Stat[];
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {


  constructor(private http: HttpClient) {}

  getManualStats(): Observable<GetStatsResponse> {
    return this.http.get<GetStatsResponse>(manualStatsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of(new GetStatsResponse()) as Observable<GetStatsResponse>);
      })
    );
  }

  getAutoStats(): Observable<GetStatsResponse> {
    return this.http.get<GetStatsResponse>(getStatsUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return (of(new GetStatsResponse()) as Observable<GetStatsResponse>);
      })
    );
  }
}


