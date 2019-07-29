import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-referenced-table-menu',
  templateUrl: 'referenced-table-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferencedTableMenuComponent {
  @Input() canViewCivility = false;
}
