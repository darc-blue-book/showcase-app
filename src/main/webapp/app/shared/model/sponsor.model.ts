import { IUser } from 'app/shared/model/user.model';
import { IProject } from 'app/shared/model/project.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';

export interface ISponsor {
  id?: string;
  iban?: string;
  amount?: number;
  currency?: Currency;
  userId?: IUser;
  projectId?: IProject;
}

export const defaultValue: Readonly<ISponsor> = {};
