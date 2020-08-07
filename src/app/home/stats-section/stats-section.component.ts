import { Component, OnInit } from '@angular/core';
import {StatsService, Stat} from '../../services/stats/stats.service';

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.css']
})
export class StatsSectionComponent implements OnInit {
  stats: Stat[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getStats().subscribe(stats => {
      this.stats.push(...stats);
    });
  }

}
