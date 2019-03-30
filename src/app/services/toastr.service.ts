import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken('toastr');

declare let toastr: any;

@Injectable()
export class ToastrService {

    success(message: string, title?: string) {
        toastr.options = {
            'positionClass': 'toast-bottom-full-width',
            'preventDuplicates': true
        };
        toastr.success(message, title);
    }
    info(message: string, title?: string) {
        toastr.options = {
            'positionClass': 'toast-bottom-full-width',
            'preventDuplicates': true
        };
        toastr.info(message, title);
    }
    warning(message: string, title?: string) {
        toastr.options = {
            'positionClass': 'toast-bottom-full-width',
            'preventDuplicates': true
        };
        toastr.warning(message, title);
    }
    error(message: string, title?: string) {
        toastr.options = {
            'positionClass': 'toast-bottom-full-width',
            'preventDuplicates': true
        };
        toastr.error(message, title);
    }
}