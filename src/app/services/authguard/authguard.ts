import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class Authguard implements CanActivate {

    constructor(private router: Router,private loginService : LoginService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if(this.loginService.isLoggedIn()){
            return true;
        }        
        this.router.navigate(['/login']);
        return;
    }
}
