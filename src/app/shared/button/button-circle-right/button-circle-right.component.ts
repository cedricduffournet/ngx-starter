import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button-circle-right',
  templateUrl: './button-circle-right.component.html',
  styleUrls: ['./button-circle-right.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonCircleRightComponent {
  @Input() label = '';
  @Input() type = 'success';
}
