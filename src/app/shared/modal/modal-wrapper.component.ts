import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit() {}
}
