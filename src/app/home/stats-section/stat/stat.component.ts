import { Component, OnInit, Input } from '@angular/core';
import {Stat} from '../../../services/stats/stats.service';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @Input() stat: Stat;

  constructor() { }

  ngOnInit(): void {
  }

}
