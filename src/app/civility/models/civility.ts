import { schema } from 'normalizr';

export interface Civility {
  id: number;
  name: string;
  code: string;
}

export const civilitySchema = new schema.Entity('civilities');
