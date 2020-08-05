import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';

const imgPath = '/assets/img'
@Component({
  selector: 'app-webp',
  templateUrl: './webp.component.html',
  styleUrls: ['./webp.component.css']
})
export class WebpComponent implements OnInit, AfterContentChecked {
  @Input() name = '';
  @Input() type = '';
  @Input() alt = '';
  webp = '';
  jpg = '';
  png = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if (this.name !== '') {
      this.webp = `${imgPath}/${this.type}/${this.name}.webp`;
      this.jpg = `${imgPath}/${this.type}/${this.name}.jpg`;
      this.png = `${imgPath}/${this.type}/${this.name}.png`;
    }
  }
}
