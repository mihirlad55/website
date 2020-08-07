import { Component, OnInit } from '@angular/core';
import {StatsService, Stat} from '../../services/stats/stats.service';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.css']
})
export class StatsSectionComponent implements OnInit {
  stats: Stat[] = [];
  updatedDate: number;

  constructor(private statsService: StatsService) {
    const hours = new Date().getHours() * 60 * 60 * 1000;
    const minutes = new Date().getMinutes() * 60 * 1000;
    const seconds = new Date().getSeconds() * 1000;

    this.updatedDate = Date.now() - hours - minutes - seconds;
  }

  ngOnInit(): void {
    this.statsService.getStats().subscribe(stats => {
      this.stats.push(...stats);
    });
  }

}
