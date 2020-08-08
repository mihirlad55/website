import {Component, OnInit} from '@angular/core';
import {StatsService, Stat} from '../../services/stats/stats.service';
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
  updatedDate: number;

  constructor(private statsService: StatsService) {
    const date = new Date();
    const hours = date.getHours() * 60 * 60 * 1000;
    const minutes = date.getMinutes() * 60 * 1000;
    const seconds = date.getSeconds() * 1000;

    this.updatedDate = Date.now() - hours - minutes - seconds;
  }

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
    this.statsService.getStats().pipe(
      finalize(() => {
        this.populateRandomStats();
      })
    ).subscribe(stats => {
      this.stats.push(...stats);
    });
  }
}
