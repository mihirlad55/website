import {Component, OnInit} from '@angular/core';
import {StatsService, Stat, GetStatsResponse}
  from '../../services/stats/stats.service';
import {finalize} from 'rxjs/operators';

const numOfStatsToDisplay = 5;

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.css']
})
export class StatsSectionComponent implements OnInit {
  stats: Stat[] = [];
  tempStats: Stat[] = [];
  visibleStats: Stat[] = [];
  updatedDate: number = Date.now();

  constructor(private statsService: StatsService) { }

  populateRandomStats(): void {
    this.visibleStats = [];
    // Re-populate tempStats if it has no stats left
    if (this.tempStats.length == 0)
      this.tempStats = [...this.stats];

    let left = this.tempStats.length;

    for (let i = 0; i < numOfStatsToDisplay && this.tempStats.length > 0; i++) {
      let rand = Math.floor(Math.random() * --left);
      this.visibleStats.push(this.tempStats[rand]);
      this.tempStats.splice(rand, 1);
    }
  }

  ngOnInit(): void {
    this.statsService.getManualStats().subscribe(statsResponse => {
      this.stats.push(...statsResponse.stats);
    });

    this.statsService.getManualStats().pipe(
      finalize(() => {
        this.populateRandomStats();
      })
    ).subscribe(statsResponse => {
      this.updatedDate = new Date(statsResponse.dateUpdated).getMilliseconds();
      this.stats.push(...statsResponse.stats);
    });
  }
}
