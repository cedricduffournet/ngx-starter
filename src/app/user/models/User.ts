import { Civility } from '@app/civility/models/civility';

export interface UserGroup {
  name: string;
  roles: string[];
  superAdmin: boolean;
  admin: boolean;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  civility: Civility;
  roles: string[];
  groups: UserGroup[];
  enabled: boolean;
}
