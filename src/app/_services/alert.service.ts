import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from 'src/app/_models/enums/alert-type.enum';
import { IAlert } from 'src/app/_models/interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts$ = new BehaviorSubject<IAlert[]>([]);

  constructor() { }

  success(msg: string) {
    this.addAlert(msg, AlertType.success);
  }

  error(msg: string) {
    this.addAlert(msg, AlertType.danger);
  }

  private addAlert(msg: string, alertType: AlertType) {
    const alert: IAlert = {
      message: msg,
      type: alertType
    };
    let alerts = this.alerts$.value;
    alerts.push(alert);
    this.alerts$.next(alerts);
    setTimeout(() => {
      alerts.shift();
      this.alerts$.next(alerts);
    }, 5000);
  }
}
