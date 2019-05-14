import { Injectable } from '@angular/core';
import { Alert } from './alert';
import { isUndefined } from 'util';
import { AlertType } from './alert.enum';

@Injectable()
export class AlertService {

    public static Alerts = new Array<Alert>();

    public add(type: AlertType, message: string): void {

        this.clear();

        const alert = new Alert();
        alert.type = type;
        alert.message = message;

        AlertService.Alerts.push(alert);
    }

    public close(alert: Alert): void {
        this.closeIdx(AlertService.Alerts.indexOf(alert));
    }

    private closeIdx(index): void {
        AlertService.Alerts.splice(index, 1);
    }

    public clear(): void {
        if (!isUndefined(AlertService.Alerts)) {
            AlertService.Alerts.forEach(alert => {
                this.close(alert);
            });
        }
    }
}