import {Directive, Input, AfterContentInit, AfterContentChecked} from '@angular/core';

@Directive({
  selector: '[appPreviewable]',
  exportAs: 'appPreviewable'
})
export class PreviewableDirective implements AfterContentInit, AfterContentChecked {
  @Input() previewName: string;
  wideName = '';
  narrowName = '';
  name = '';

  constructor() {
  }

  ngAfterContentInit(): void {
    this.wideName = this.previewName + "-wide";
    this.narrowName = this.previewName + "-narrow";
  }

  ngAfterContentChecked(): void {
    this.name = (window.innerWidth <= 768 ? this.narrowName : this.wideName);
  }

}
