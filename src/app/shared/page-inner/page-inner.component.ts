import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-page-inner',
  templateUrl: './page-inner.component.html',
  styleUrls: ['./page-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageInnerComponent {
  @Input() elemClass = '';
}
