import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';
import {PreviewableDirective} from '../../directives/previewable/previewable.directive';

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
    ]),
    trigger('slideUp', [
      state('hidden', style({transform: 'translateY(100%)'})),
      state('shown', style({transform: 'translateY(0)'})),
      transition('hidden => shown', [animate('0.3s ease-in')]),
      transition('shown => hidden', [animate('0.2s ease-in')])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('occupation') occupation: TypewriterComponent;
  @Input() scrollHref = "";

  isHeaderLoaded = false;
  hoveredAnchor = null;
  previewPath = '';
  showPreview = false;

  onHover(previewPath): void {
    this.previewPath = previewPath;
    this.showPreview = true;
  }

  onMouseLeave(): void {
    this.showPreview = false;
  }

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  doneLoading(): void {
    this.isHeaderLoaded = true;
  }
}
