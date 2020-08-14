import {Component, OnInit, Input, DoCheck} from '@angular/core';

const imgPath = '/assets/img'
@Component({
  selector: 'app-webp',
  templateUrl: './webp.component.html',
  styleUrls: ['./webp.component.css'],
  exportAs: 'app-webp'
})
export class WebpComponent implements OnInit, DoCheck {
  @Input() name = '';
  @Input() fallback = '';
  @Input() type = '';
  @Input() alt = '';
  webp = '';
  jpg = '';
  png = '';

  constructor() {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    let path = `${imgPath}`;
    const filename = (this.name ? this.name : this.fallback);

    if (filename !== '') {
      if (this.type !== '') path += `/${this.type}/${filename}`;
      else path += `/${filename}`;

      this.webp = `${path}.webp`;
      this.jpg = `${path}.jpg`;
      this.png = `${path}.png`;
    }
  }
}
