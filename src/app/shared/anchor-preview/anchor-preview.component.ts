import {Component, OnInit, Input, DoCheck, ElementRef, ViewChild}
  from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {PreviewableDirective} from '../../directives/previewable/previewable.directive';
import {WebpComponent} from '../../shared/webp/webp.component';

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
    trigger('expand', [
      state('false', style({width: 'auto', height: 0, transform: 'translate(-50%, 0)', opacity: 0})),
      state('true', style({transform: 'translate(-50%, -100%)', opacity: 1})),
      transition('false => true', [animate('0.3s ease-in')]),
      transition('true => false', [animate('0.1s ease-in')])
    ]),
    trigger('darken', [
      state('false', style({'background-color': '#00000000'})),
      state('true', style({'background-color': '#00000040'})),
      transition('false => true', [animate('0.3s ease-in')]),
      transition('true => false', [animate('0.2s ease-in')])
    ])
  ]
})
export class AnchorPreviewComponent implements OnInit, DoCheck {
  @Input() previewable: PreviewableDirective;
  @Input() isPreviewVisible: boolean;
  @ViewChild('preview', {read: ElementRef}) previewEl: ElementRef;

  elHeight = 0;

  constructor() {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.previewEl && this.previewEl.nativeElement) {
      this.elHeight = this.previewEl.nativeElement.clientHeight;
    }
  }
}
