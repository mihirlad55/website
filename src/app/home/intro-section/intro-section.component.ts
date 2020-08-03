import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.css']
})
export class IntroSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('heading') heading: TypewriterComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.heading.start();
  }

}
