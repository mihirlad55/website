import { Component, OnInit, Input, AfterContentInit } from '@angular/core';

const imgPath = '/assets/'
@Component({
  selector: 'app-webp',
  templateUrl: './webp.component.html',
  styleUrls: ['./webp.component.css']
})
export class WebpComponent implements OnInit, AfterContentInit {
  @Input() name = '';
  @Input() type = 'img';
  @Input() alt = '';
  webp = '';
  jpg = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.webp = `${imgPath}${this.type}/${this.name}.webp`;
    this.jpg = `${imgPath}${this.type}/${this.name}.jpg`;
  }
}
