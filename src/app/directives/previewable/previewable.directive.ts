import {Directive, Input, AfterContentInit} from '@angular/core';

const rootPreviewPath = "/assets/previews/"
@Directive({
  selector: '[appPreviewable]',
  exportAs: 'appPreviewable'
})
export class PreviewableDirective implements AfterContentInit {
  @Input() previewName: string;
  previewPath = '';

  constructor() {
  }

  ngAfterContentInit(): void {
    this.previewPath = rootPreviewPath + this.previewName + ".png";
  }

}
