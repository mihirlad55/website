import {Directive, Input, AfterContentInit, AfterContentChecked, ElementRef, DoCheck}
  from '@angular/core';

@Directive({
  selector: '[appPreviewable]',
  exportAs: 'appPreviewable'
})
export class PreviewableDirective implements AfterContentInit, AfterContentChecked, DoCheck {
  @Input() previewName: string;
  wideName = '';
  narrowName = '';
  name = '';
  elTop = 0;

  constructor(private elRef: ElementRef) {
  }

  ngDoCheck(): void {
    this.elTop = this.elRef.nativeElement.getBoundingClientRect().top;
    if (this.wideName === '')
      this.wideName = this.previewName + "-wide";
    if (this.narrowName === '')
      this.narrowName = this.previewName + "-narrow";
    this.name = (window.innerWidth <= 768 ? this.narrowName : this.wideName);
  }

  ngAfterContentInit(): void {
  }

  ngAfterContentChecked(): void {
  }

}
