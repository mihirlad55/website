import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypewriterComponent} from './typewriter/typewriter.component';
import {AnchorPreviewComponent} from './anchor-preview/anchor-preview.component';
import {PreviewableDirective} from '../directives/previewable/previewable.directive';

@NgModule({
  declarations: [
    TypewriterComponent,
    AnchorPreviewComponent,
    PreviewableDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TypewriterComponent,
    AnchorPreviewComponent,
    PreviewableDirective
  ]
})
export class SharedModule {}
