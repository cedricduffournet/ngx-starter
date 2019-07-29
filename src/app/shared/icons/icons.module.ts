import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPowerOff,
  faPencilAlt,
  faTrashAlt,
  faAngleLeft,
  faTimes,
  faHome,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  exports: [FontAwesomeModule]
})
export class IconsModule {
  constructor() {
    library.add(
      faPowerOff,
      faPencilAlt,
      faTrashAlt,
      faAngleLeft,
      faTimes,
      faHome,
      faSlidersH
    );
  }
}
