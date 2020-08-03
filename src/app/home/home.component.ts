import {Component, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../shared/typewriter/typewriter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('homeLoaded', [
      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      transition('hidden => shown', [animate('1s ease')])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('intro') intro: TypewriterComponent;
  @ViewChild('occupation') occupation: TypewriterComponent;

  isHomeLoaded = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.intro.start();
  }

  doneLoading(): void {
    this.isHomeLoaded = true;
  }
}
