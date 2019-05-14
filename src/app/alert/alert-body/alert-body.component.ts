import {
    Component,
    Input
} from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { AlertType } from '../alert.enum';

@Component({
    selector: 'app-alert-body',
    templateUrl: './alert-body.component.html',
    animations: [
        trigger('hideAlert', [
            state('false', style({ opacity: 1 })),
            state('true', style({ opacity: 0 })),
            transition('false => true', animate('.5s'))
        ])
    ]
})

export class AlertBodyComponent {

    private _message: string;
    hideAlert = false;
    bootstrapStyle: string;

    @Input()
    get message(): string {
        return this._message;
    }
    set message(value: string) {
        this._message = value;
        this.hideAlert = false;
        setTimeout(() => {
            this.hideAlertAnimator();
        }, 5000);
    }
    @Input()
    set type(value: AlertType) {
        switch (+value) {
            case AlertType.success:
                this.bootstrapStyle = 'success';
                break;
            case AlertType.warning:
                this.bootstrapStyle = 'warning';
                break;
            case AlertType.error:
                this.bootstrapStyle = 'danger';
                break;
            default:
                this.bootstrapStyle = 'info';
                break;
        }
    }

    hideAlertAnimator() {
        if (this.hideAlert === false) {
            this.hideAlert = true;
        }
    }

    close() {
        this.hideAlertAnimator();
    }
}