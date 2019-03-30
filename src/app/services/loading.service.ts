import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
  private loadingActivate = new Subject<boolean>();

  loadConfirm$ = this.loadingActivate.asObservable();

  confirmLoading(loading: boolean) {
    this.loadingActivate.next(loading);
  }
}
