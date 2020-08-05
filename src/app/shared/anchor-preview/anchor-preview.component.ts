import {Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild}
  from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {PreviewableDirective} from '../../directives/previewable/previewable.directive';

@Component({
  selector: 'app-anchor-preview',
  templateUrl: './anchor-preview.component.html',
  styleUrls: ['./anchor-preview.component.css'],
  animations: [
    trigger('fadeIn', [
      state('false', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition('false <=> true', [animate('0.3s ease-in')]),
      transition('true => false', [animate('0.2s ease-in')])
    ]),
    trigger('slideDown', [
      state('false', style({transform: 'translateY(-100%)', 'box-shadow': 'none'})),
      state('true', style({transform: 'translateY(0)'})),
      transition('false => true', [animate('0.3s ease-in')]),
      transition('true => false', [animate('0.2s ease-in')])
    ]),
    trigger('darken', [
      state('false', style({'background-color': '#00000000'})),
      state('true', style({'background-color': '#00000040'})),
      transition('false => true', [animate('0.3s ease-in')]),
      transition('true => false', [animate('0.2s ease-in')])
    ])
  ]
})
export class AnchorPreviewComponent implements OnInit, AfterViewInit {
  @Input() previewable: PreviewableDirective;
  @Input() isPreviewVisible: boolean;
  @ViewChild('preview') previewEl: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.previewEl.nativeElement) {
      const elHeight = this.previewEl.nativeElement.getBoundingClientRect().height;
      this.previewEl.nativeElement.style.top = -elHeight;
    }
  }
}
