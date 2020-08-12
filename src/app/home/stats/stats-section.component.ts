import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {StatsService, Stat, GetStatsResponse}
  from '../../services/stats/stats.service';

const numOfStatsToDisplay = 4;

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.css']
})
export class StatsSectionComponent implements OnInit {
  manualStats: Observable<GetStatsResponse>;
  autoStats: Observable<GetStatsResponse>;
  stats: Stat[] = [];
  visibleStats: Stat[] = [];
  updatedDate: Date;
  private tempStats: Stat[] = [];
  private responsesLeft = 2;

  constructor(private statsService: StatsService) {
    this.manualStats = this.statsService.getManualStats();
    this.autoStats = this.statsService.getAutoStats();
  }

  populateRandomStats(): void {
    this.visibleStats = [];
    // Re-populate tempStats if it has no stats left
    if (this.tempStats.length == 0)
      this.tempStats = [...this.stats];

    for (let i = 0; i < numOfStatsToDisplay && this.tempStats.length > 0; i++) {
      let rand = Math.floor(Math.random() * this.tempStats.length);
      this.visibleStats.push(this.tempStats[rand]);
      this.tempStats.splice(rand, 1);
    }
  }

  ngOnInit(): void {
    this.manualStats.subscribe(statsResponse => {
      this.stats.push(...statsResponse.stats);
      if (--this.responsesLeft == 0)
        this.populateRandomStats();
    });

    this.autoStats.subscribe(statsResponse => {
      this.updatedDate = new Date(statsResponse.dateUpdated);
      this.stats.push(...statsResponse.stats);
      if (--this.responsesLeft == 0)
        this.populateRandomStats();
    });
  }
}
