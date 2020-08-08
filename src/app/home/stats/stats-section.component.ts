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
    let tempStats = [...this.stats];
    let left = this.stats.length;

    for (let i = 0; i < numOfStatsToDisplay; i++) {
      let rand = Math.floor(Math.random() * --left);
      this.visibleStats.push(tempStats[rand]);
      tempStats.splice(rand, 1);
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
