import { AlertType } from './alert-type.enum';

export interface IAlert {
  message: string;
  type: AlertType;
}
