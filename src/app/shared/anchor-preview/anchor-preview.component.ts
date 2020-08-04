import {Component, OnInit, Input, AfterViewInit, ElementRef, HostListener}
  from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-anchor-preview',
  templateUrl: './anchor-preview.component.html',
  styleUrls: ['./anchor-preview.component.css'],
  animations: [
  ]
})
export class AnchorPreviewComponent implements OnInit, AfterViewInit {
  @Input() previewPath: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elHeight = this.elRef.nativeElement.getBoundingClientRect().height;
    this.elRef.nativeElement.style.top = -elHeight;
  }
}
