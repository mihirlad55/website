import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypewriterComponent} from './typewriter/typewriter.component';
import {AnchorPreviewComponent} from './anchor-preview/anchor-preview.component';
import {WebpComponent} from './webp/webp.component';
import {CountUpComponent} from './count-up/count-up.component';
import {PreviewableDirective} from '../directives/previewable/previewable.directive';

@NgModule({
  declarations: [
    TypewriterComponent,
    AnchorPreviewComponent,
    WebpComponent,
    CountUpComponent,
    PreviewableDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TypewriterComponent,
    AnchorPreviewComponent,
    WebpComponent,
    CountUpComponent,
    PreviewableDirective
  ]
})
export class SharedModule {}
