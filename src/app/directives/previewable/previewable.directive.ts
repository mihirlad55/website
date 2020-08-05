import {Directive, Input, AfterContentInit, AfterContentChecked} from '@angular/core';

const rootPreviewPath = "/assets/previews/"

@Directive({
  selector: '[appPreviewable]',
  exportAs: 'appPreviewable'
})
export class PreviewableDirective implements AfterContentInit, AfterContentChecked {
  @Input() previewName: string;
  previewNarrowPath = '';
  previewWidePath = ''
  previewPath = '';

  constructor() {
  }

  ngAfterContentInit(): void {
    this.previewWidePath = rootPreviewPath + this.previewName + "-wide.png";
    this.previewNarrowPath = rootPreviewPath + this.previewName + "-narrow.png";
  }

  ngAfterContentChecked(): void {
    if (window.innerWidth <= 768)
      this.previewPath = this.previewNarrowPath;
    else
      this.previewPath = this.previewWidePath;
  }

}
