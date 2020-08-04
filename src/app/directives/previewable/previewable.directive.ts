import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appPreviewable]'
})
export class PreviewableDirective {
  @Input() previewPath: string;
  @Input() previewAlt = '';

  constructor() {}

}
