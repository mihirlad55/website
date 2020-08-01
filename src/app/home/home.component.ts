import {Component, OnInit, ViewChild} from '@angular/core';
import {TypewriterComponent} from '../typewriter/typewriter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('intro') intro: TypewriterComponent;
  @ViewChild('occupation') occupation: TypewriterComponent;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.intro.start();
  }

}
