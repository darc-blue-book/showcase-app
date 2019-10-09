import { IUser } from 'app/shared/model/user.model';

export interface IExpert {
  id?: string;
  expertise?: string;
  userId?: IUser;
}

export const defaultValue: Readonly<IExpert> = {};
