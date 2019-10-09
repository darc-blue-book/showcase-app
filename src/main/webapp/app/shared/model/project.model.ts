import { Moment } from 'moment';
import { IExpert } from 'app/shared/model/expert.model';
import { IUser } from 'app/shared/model/user.model';

export interface IProject {
  id?: string;
  title?: string;
  start?: Moment;
  end?: Moment;
  description?: string;
  funds?: number;
  image?: string;
  city?: string;
  country?: string;
  score?: number;
  expertId?: IExpert;
  initiatorId?: IUser;
  users?: IUser[];
}

export const defaultValue: Readonly<IProject> = {};
