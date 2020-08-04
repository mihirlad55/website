import {AfterViewInit} from '@angular/core'
import {Directive, Input, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements AfterViewInit {
  @Input('ratio') parallaxRatio = 1;

  initialTop = 0;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.initialTop = this.elRef.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    this.elRef.nativeElement.style.top =
      ((window.scrollY * this.parallaxRatio)) + 'px';
  }

}
