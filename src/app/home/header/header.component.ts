import {Component, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';
import {PreviewableDirective} from '../../directives/previewable/previewable.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeIn', [
      state('false', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition('false <=> true', [animate('1s ease-in')])
    ]),
    trigger('fadeDown', [
      state('false', style({opacity: 0, transform: 'translateY(-50px)', 'z-index': -2})),
      state('true', style({opacity: 1, transform: 'translateY(0px)', 'z-index': 'initial'})),
      transition('false <=> true', [animate('1s ease-in')])
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('occupation') occupation: TypewriterComponent;
  @Input() scrollHref = "";

  isHeaderLoaded = false;
  previewable: PreviewableDirective;
  isPreviewVisible = false;

  showPreview(previewable: PreviewableDirective): void {
    this.previewable = previewable;
    this.isPreviewVisible = true;
  }

  hidePreview(): void {
    this.isPreviewVisible = false;
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (window.scrollY == 0)
      this.renderer.addClass(document.body, 'no-scroll');
  }

  ngAfterViewInit(): void {
  }

  doneLoading(): void {
    this.isHeaderLoaded = true;
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
