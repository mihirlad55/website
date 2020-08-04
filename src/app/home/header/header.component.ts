import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('headerLoaded', [
      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      transition('hidden => shown', [animate('1s ease')])
    ]),
    trigger('fadeDown', [
      state('hidden', style({opacity: 0, transform: 'translateY(-50px)'})),
      state('shown', style({opacity: 1, transform: 'translateY(0px)'})),
      transition('hidden => shown', [animate('1s ease')])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('occupation') occupation: TypewriterComponent;
  @Input() scrollHref = "";

  isHeaderLoaded = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  doneLoading(): void {
    this.isHeaderLoaded = true;
  }
}
