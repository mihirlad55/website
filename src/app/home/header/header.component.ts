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
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('intro') intro: TypewriterComponent;
  @ViewChild('occupation') occupation: TypewriterComponent;
  @Input() scrollHref = "";

  isHeaderLoaded = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.intro.start();
  }

  doneLoading(): void {
    this.isHeaderLoaded = true;
  }
}
