// check this : https://github.com/ngrx/platform/issues/1521
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extModules = [StoreDevtoolsModule.instrument()];
