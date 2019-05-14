import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointmanagerService {

  private base:string = "https://api.urudin.tk/"

  getLogin() : string{
    return (this.base + "admin/login");
  }

  getScooterEndpoint(): string{
    return (this.base + "scooter");
  }

  getParameterEndpoint(): string{
    return (this.base + "parametro");
  }
}

