import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TypewriterComponent} from '../../shared/typewriter/typewriter.component';
import {PreviewableDirective} from '../../directives/previewable/previewable.directive';
import {AnchorPreviewComponent} from '../../shared/anchor-preview/anchor-preview.component';

class Link {
  name = '';
  title = '';
  href = '';
  alt = '';
  isPreviewVisible? = false;
  previewable?: PreviewableDirective;
}

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
  win = window;

  links: Link[] = [
    {
      name: 'email',
      title: 'Email Me',
      href: 'mailto:contact@mihirlad.com',
      alt: 'Email'
    },
    {
      name: 'linkedin',
      title: 'My LinkedIn Profile',
      href: 'https://linkedin.com/in/mihirlad55',
      alt: 'LinkedIn'
    },
    {
      name: 'github',
      title: 'My GitHub Profile',
      href: 'https://github.com/mihirlad55',
      alt: 'GitHub'
    },
    {
      name: 'gitlab',
      title: 'My GitLab Profile',
      href: 'https://gitlab.com/mihirlad55',
      alt: 'GitLab'
    }
  ];

  showPreview(link: Link): void {
    link.isPreviewVisible = true;
  }

  hidePreview(link: Link): void {
    link.isPreviewVisible = false;
  }

  bindPreviewable(previewable: PreviewableDirective, link: Link) {
    link.previewable = previewable;
  }

  constructor() {}

  ngOnInit(): void {
  }

  doneLoading(): void {
    this.isHeaderLoaded = true;
  }
}
