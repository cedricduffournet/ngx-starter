import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: '../../../assets/logo.svg'
})
export class LogoComponent {
  @Input() color = 'white';
}
