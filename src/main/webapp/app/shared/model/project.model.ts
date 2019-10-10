import { Moment } from 'moment';
import { IExpert } from 'app/shared/model/expert.model';
import { IUser } from 'app/shared/model/user.model';
import { ISponsor } from 'app/shared/model/sponsor.model';

export interface IProject {
  id?: string;
  title?: string;
  start?: Moment;
  end?: Moment;
  description?: string;
  funds?: number;
  image?: string;
  volunteerNumber?: number;
  videoUrl?: string;
  city?: string;
  country?: string;
  score?: number;
  expertId?: IExpert;
  initiatorId?: IUser;
  users?: IUser[];
  sponsors?: ISponsor[];
}

export const defaultValue: Readonly<IProject> = {};
