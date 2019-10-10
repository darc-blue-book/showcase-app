import { IUser } from 'app/shared/model/user.model';

export interface IExpert {
  id?: string;
  pictureContentType?: string;
  picture?: any;
  expertise?: string;
  userId?: IUser;
}

export const defaultValue: Readonly<IExpert> = {};
