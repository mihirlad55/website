import {Component, OnInit, Input, AfterViewInit, ElementRef, HostListener}
  from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-anchor-preview',
  templateUrl: './anchor-preview.component.html',
  styleUrls: ['./anchor-preview.component.css'],
  animations: [
    trigger('slideUp', [
      state('hidden', style({display: 'none'})),
      state('shown', style({display: 'initial', bottom: 0, top: 0})),
      transition('hidden => shown', [animate('1.5s ease-in')])
    ])
  ]
})
export class AnchorPreviewComponent implements OnInit, AfterViewInit {
  @Input() previewPath: string;
  @Input() previewAlt: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elHeight = this.elRef.nativeElement.getBoundingClientRect().height;
    this.elRef.nativeElement.bottom = window.innerHeight + elHeight;
  }
}
